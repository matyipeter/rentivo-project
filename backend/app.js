const express = require('express');
const cors = require('cors');
const app = express();
const validator = require('validator');
const rateLimit = require('express-rate-limit');
const nodeMailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

const db = require('./db'); 

const port = process.env.PORT || 9000;



app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }));
  
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


const suggestionLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // limit each IP to 5 requests per windowMs
    message: { error: 'Too many submissions, try again later.' }
});

app.post('/api/submit-suggestion',  suggestionLimiter, async (req, res) => {
    
    let { name, email, suggestion } = req.body;

    // Basic type and length checks
    if (!name || !email || !suggestion ||
        typeof name !== 'string' ||
        typeof email !== 'string' ||
        typeof suggestion !== 'string' ||
        name.length > 100 || email.length > 100 || suggestion.length > 1000
    ) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    // Email validation
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    // Escape dangerous characters
    name = validator.escape(name);
    suggestion = validator.escape(suggestion);

    // Optionally log only for debugging
    console.log('Received suggestion:', suggestion);
    console.log('Name:', name);

    // Save to database
    try {
        await db.query('INSERT INTO suggestions (name, email, suggestion) VALUES ($1, $2, $3)', [name, email, suggestion]);
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Database error' });
    }


    res.status(200).json({ message: 'Suggestion received successfully!' });
});

app.post('/api/subscribe', async (req, res) => {

    const { email } = req.body;

    // Validate email
    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    // Save to database
    try {
        await db.query('INSERT INTO users (email) VALUES ($1)', [email]);
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Database error' });
    }

    // Send confirmation email
    try {
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Subscription Confirmation',
            text: 'Thank you for subscribing to our newsletter!',
        });
    } catch (error) {
        console.error('Email error:', error);
        return res.status(500).json({ error: 'Failed to send confirmation email' });
    }

    res.status(200).json({ message: 'Subscription successful!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
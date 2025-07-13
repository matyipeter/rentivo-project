# Use the Node.js LTS image
FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the backend port (adjust if needed)
EXPOSE 9000

# Start the server
CMD [ "npm", "start" ]

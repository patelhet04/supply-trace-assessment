# Use the official Node.js image from the Docker Hub
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container at /app
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of the application code into the container at /app
COPY . .

# Expose port 5173
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]

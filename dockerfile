# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install nodemon globally for hot reload
RUN npm install -g nodemon

# Copy the application files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Start the application with nodemon for hot reload
CMD ["nodemon", "--watch", ".", "--exec", "npm", "run", "dev"]

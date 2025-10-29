# Stage 1: Build the React frontend
# Use a Node.js image as the base. 'alpine' is a lightweight version.
FROM node:18-alpine AS build

# Set the working directory inside the container for the frontend code
WORKDIR /app/frontend

# Copy the package.json and package-lock.json from your './frontend' directory
COPY frontend/package*.json ./

# Install all dependencies for the React app
RUN npm install

# Copy the rest of your './frontend' source code (src, public, etc.)
COPY frontend/ ./

# Build the frontend for production. This creates a '/app/frontend/build' folder inside the container.
RUN npm run build


# Stage 2: Setup the Node.js backend for production
# Use a lightweight Node.js image for the final, smaller image
FROM node:18-alpine

# Set the working directory for the entire application
WORKDIR /app

# Copy package.json and package-lock.json from your project root ('SANDHARA/')
COPY package*.json ./

# Install ONLY the production dependencies listed in the root package.json
RUN npm install --production

# Copy all the backend code from your './backend' directory into the container
COPY backend/ ./backend/

# Copy the 'uploads' folder from your project root.
# If you want to include the existing images in your build, uncomment the next line.
# COPY uploads/ ./uploads/

# Copy the built React app from the 'build' stage into the final image
COPY --from=build /app/frontend/build ./frontend/build

# Expose port 5000, which is where your backend/server.js is likely listening
EXPOSE 5000

# The command to start your server when the container launches.
# We use 'node' directly for production, not 'nodemon'.
CMD ["node", "backend/server.js"]
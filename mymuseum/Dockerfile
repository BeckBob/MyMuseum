# Step 1: Build the React app
# Use an official Node runtime as a parent image
FROM node:14 AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Step 2: Serve the React app
# Use an official Nginx image as a parent image
FROM nginx:alpine

# Copy the built app from the build stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Run Nginx server
CMD ["nginx", "-g", "daemon off;"]
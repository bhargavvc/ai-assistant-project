# Stage 1: Build the React application
FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire application and build it
COPY . .
RUN npm run build:production

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL


# Stage 2: Serve the built files using Nginx
FROM nginx:alpine

# Copy the built React app to Nginx's serving directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port Nginx runs on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

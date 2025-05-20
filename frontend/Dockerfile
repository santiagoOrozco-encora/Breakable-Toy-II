# Build stage
FROM node:20-alpine AS build

WORKDIR /appFrontend

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the built files from the build stage to nginx serving directory
COPY --from=build /appFrontend/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 for the frontend
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# Stage 1: Build the Angular app
FROM node:18 as build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the built Angular files from Stage 1
COPY --from=build /app/dist/marriage-hall /usr/share/nginx/html

# Copy custom Nginx config (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

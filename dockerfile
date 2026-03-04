FROM nginx:stable-alpine

# Clear default HTML
RUN rm -rf /usr/share/nginx/html/*

# Copy your site files
COPY . /usr/share/nginx/html

# Copy custom Nginx config
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
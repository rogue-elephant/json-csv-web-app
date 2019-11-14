# Get Node base image
FROM node:12.13.0

# Copy project into app directory
WORKDIR /app
COPY . .

# Install Angular CLI globally and install project packages
RUN npm install -g @angular/cli@8.3.18 && \
    npm install

# Serve Angular App
CMD ng serve --host 0.0.0.0 --poll 200

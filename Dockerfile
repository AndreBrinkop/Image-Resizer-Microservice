FROM node:12.16.2-stretch

# Create a working directory
WORKDIR /app

# Copy source code to working directory
COPY package.json package-lock.json src/app.js src/.  ./

# Install dependencies
RUN npm install

# Expose port 3000
EXPOSE 3000

## Step 5:
# Run app.js at container launch
CMD ["node", "./app.js"]
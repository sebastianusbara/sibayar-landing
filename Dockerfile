# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json (and package-lock.json if available) and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Bundle app source
COPY . .

# Build your Next.js app
RUN npm run build

# Start the Next.js app
CMD ["npm", "start"]

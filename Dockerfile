# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json yarn.lock* ./
RUN yarn install

# Bundle app source
COPY . .

# Build your Next.js app
RUN yarn build

# Start the Next.js app
CMD ["yarn", "start"]

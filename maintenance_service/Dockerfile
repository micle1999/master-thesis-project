# .......Development Stage.......
FROM node:20-alpine as development
# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./
# Upgrade npm to the latest version globally
RUN npm install -g npm@latest
# Install project dependencies
RUN npm install
# Install ts-node globally for running TypeScript code
RUN npm install -g ts-node
# Copy the entire application code into the container
COPY . .
# Set env variable for port
ENV PORT 3000
# Build the application 
CMD npm run dev

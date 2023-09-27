FROM node

# Create app directory
WORKDIR /usr/app

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci --omit=dev

# Bundle source
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
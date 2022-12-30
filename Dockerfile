FROM node:14 AS ui-build

WORKDIR /ui/ 
COPY package*.json ./
RUN npm install
COPY src/ ./src
COPY public/ ./public
RUN npm run build

FROM node:16 AS server-build

# Create app directory
WORKDIR /

COPY --from=ui-build /ui/build/ ./client/build
WORKDIR /

COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY server.js ./

ENV NODE_ENV=production

EXPOSE 8080

CMD [ "node", "server.js" ]
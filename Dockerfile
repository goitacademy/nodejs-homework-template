# create own image from image "node"
FROM node:14-alpine

# set working directory and set context of our application
WORKDIR /app

# check that node_modules were changed
COPY package.json /app

# launch if node_modules were changed but if they weren't - Docker take them from cache
RUN npm install

# create our app from local project "node"
COPY . .

# set port
EXPOSE 8080

# launch a command when our image is starting
CMD ["node", "server.js"]
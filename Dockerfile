# Fetching the minified node image on apline linux
FROM node:slim



# Setting up the work directory
WORKDIR .

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Installing pm2 globally
# RUN npm install pm2 -g

# Starting our application
# CMD pm2 start process.yml && tail -f /dev/null

CMD npm run start

# Exposing server port
EXPOSE 3000
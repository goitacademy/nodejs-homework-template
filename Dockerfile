FROM  node
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4000
CMD [ "node", "bin/server" ]
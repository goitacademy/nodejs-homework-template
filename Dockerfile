

FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "server"]

# docker build .
# docker images
# docker run <IMAGE ID>
# docker run -d <IMAGE ID> 
# docker run -d -p 4000:3000 <IMAGE ID>
# docker ps
# docker stop <IMAGE ID>
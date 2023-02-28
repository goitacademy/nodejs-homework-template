FROM node:19.5-alpine

WORKDIR /server

COPY ./package.json .
COPY ./tsconfig.json .

RUN npm install
COPY . . 

ENV SERVER_PORT=3000
ENV DB_URI=mongodb+srv://AndriiZaimak:bLeuxkI9DP92NPr0@cluster0.cj0kwmv.mongodb.net/db-contacts?retryWrites=true&w=majority
ENV JWT_SECRET=7FdNT+I^Q5Um4Cgq$cN6St%6xrjkHjk+5cMq7LTrrIq!9LwYu
ENV MAIL_API_KEY=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

EXPOSE 3000

CMD npm run start:prod

FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./
ENV DB_HOST=mongodb+srv://szafir:87d6eb65@nodejs.jn2r7ru.mongodb.net/db-contacts?retryWrites=true&w=majority
ENV SALT=8
ENV SECRET=djhasjkfgkasdjgjkasdhfjaksdhjkashdjklasgfuilqweruiqah
ENV SENDGRID_API_KEY=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
ENV EMAIL=kamil.p.szafranski@gmail.com



RUN npm install

COPY . .
CMD ["npm", "start"]

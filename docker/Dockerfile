FROM node:9.11-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /usr/src/app

COPY . ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
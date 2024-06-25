FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN npm i
#RUN npm run codegen
RUN npm run build
EXPOSE 3000
CMD npm run start
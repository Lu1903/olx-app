FROM node:13 as build

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /client/dist/ /usr/share/nginx/html

#EXPOSE 8080

# ADDED

CMD ["nginx", "-g", "daemon off;"]
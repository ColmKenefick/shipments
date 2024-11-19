
FROM node:18 AS build

WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install

# move react app and build
COPY . ./
RUN npm run build

# nginx to
FROM nginx:alpine

# cp build output to Nginx's default HTML location
COPY --from=build /app/build /usr/share/nginx/html

# expose  Nginx port
EXPOSE 80

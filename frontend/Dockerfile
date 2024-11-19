
FROM node:18 AS build

WORKDIR /app

# install deps
COPY package*.json ./
RUN npm install

# copy code to the container and build
COPY . ./
RUN npm run build

# nginx
FROM nginx:alpine

# cp build output to nginx's HTML location
COPY --from=build /app/build /usr/share/nginx/html

# expose nginx
EXPOSE 80

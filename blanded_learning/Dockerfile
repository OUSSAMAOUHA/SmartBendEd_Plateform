# Stage 1: Compile and Build Angular Codebase
FROM node:18.10.0 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --save --legacy-peer-deps

COPY . .

RUN npm run build

# Stage 2: Serve App with Nginx Server
FROM nginx:alpine

COPY --from=build /usr/src/app/dist/pi /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

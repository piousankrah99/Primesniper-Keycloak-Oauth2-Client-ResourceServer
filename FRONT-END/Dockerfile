# Build stage
FROM node:18.18.2 as build

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Build the Angular app using Angular CLI
RUN ng build --configuration=production

# Deploy stage
FROM nginx:stable-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/front-end /usr/share/nginx/html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
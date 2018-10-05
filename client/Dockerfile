FROM node:8.12

# Create app directory
WORKDIR /usr/local/app/client

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package*.json ./

ENV NODE_PATH=/usr/local/app/client/node_modules
ENV PATH=$PATH:/usr/local/app/client/node_modules/.bin

# If you are building your code for production
# RUN npm install --only=production
RUN npm install
RUN rm -rf build
COPY . .
RUN npm run build

# Bundle app source

FROM nginx:1.15.2-alpine
COPY ./build /var/www
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 5000

CMD ["nginx", "-g", "daemon off;"]

# CMD [ "npm", "start" ]

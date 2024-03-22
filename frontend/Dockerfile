FROM node:14

# set working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm i
# If you are building your code for production
# RUN npm ci --only=production

# add app
COPY . ./

EXPOSE 3000
# start app
CMD ["npm", "start"]
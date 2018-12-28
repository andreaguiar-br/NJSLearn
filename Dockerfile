FROM node:8

# Create app directory
WORKDIR /home/f0739445/Documentos/labbs/nodejs

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# instalando driver do mongodb para conexão
RUN npm install mongodb


# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]


FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

ENV DEBUG=todo-express-backend:*

USER node

# npm start is the command to start the application in development mode
CMD ["npm", "run", "dev"]

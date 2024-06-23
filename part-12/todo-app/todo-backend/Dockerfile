FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production

ENV DEBUG=todo-backend:*

ENV NODE_ENV production

USER node

CMD ["node", "./bin/www"]

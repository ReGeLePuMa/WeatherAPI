FROM node:20.9.0-alpine
WORKDIR /app
COPY package.json .
RUN npm install --no-audit
COPY . .
RUN npm run build
CMD [ "npm", "run", "start"]
# First stage
# Build dist files
FROM node:14.16.1-alpine
WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .
RUN yarn build

# Second stage
# Keep only dist files
FROM node:14.16.1-alpine
WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
COPY resources .
COPY --from=0 /usr/app/dist/ /usr/app/dist/

RUN yarn --prod

ENV PORT=3000
EXPOSE 3000

CMD ["node", "-r", "module-alias/register", "./dist/server.js"]

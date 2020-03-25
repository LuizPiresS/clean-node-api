#Versao do node
FROM node:12
#diretorio interno que o app vai rodar
WORKDIR /usr/src/clean-node-api
#instala o yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN sudo apt update
RUN sudo apt install yarn
#copia o arquivo package.json para a raiz do diretorio interno
COPY ./package.json .
#roda o npm
RUN yarn install --prod
#copia a pasta dist
COPY ./dist ./dist
EXPOSE 1313
CMD yarn start

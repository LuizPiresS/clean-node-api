#Versao do node
FROM node:12
#diretorio interno que o app vai rodar
WORKDIR /usr/src/clean-node-api
#copia o arquivo package.json para a raiz do diretorio interno
COPY ./package.json .
#roda o yarn
RUN yarn install --prod

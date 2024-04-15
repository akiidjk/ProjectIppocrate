# Fase di build
FROM oven/bun:1.1.3 as base

WORKDIR /frontend

COPY package.json package-lock.json ./

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Installa le dipendenze
RUN mkdir -p /temp/prod
COPY package.json /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Copia il resto dei file necessari per la build
COPY . .

# Costruisci l'applicazione
RUN bun run build

EXPOSE 3000

# Avvia l'applicazione
CMD ["bun", "run", "start","--","-H","0.0.0.0"]

# ! PROD
# # Fase di build
# FROM node:20

# WORKDIR /frontend

# # Copia i file 'package.json' e 'package-lock.json' (o 'yarn.lock')
# COPY package.json package-lock.json ./

# # Installa le dipendenze
# RUN npm ci

# # Copia il resto dei file necessari per la build
# COPY . .

# # Costruisci l'applicazione
# #RUN npm run build

# EXPOSE 3000

# # Avvia l'applicazione ascoltando su tutte le interfacce di rete
# CMD ["npm", "run", "dev" , "--", "-H", "0.0.0.0"]

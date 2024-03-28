# Fase di build
FROM node:20

WORKDIR /frontend

COPY package.json package-lock.json ./

# Installa le dipendenze
RUN npm ci

# Copia il resto dei file necessari per la build
COPY . .

# Costruisci l'applicazione
RUN npm run build

EXPOSE 3000

# Avvia l'applicazione
CMD ["npm", "start","-H","0.0.0.0"]

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

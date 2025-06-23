# Basis-Image mit Node.js
FROM node:18

# Arbeitsverzeichnis im Container
WORKDIR /app

# package.json und package-lock.json kopieren
COPY package*.json ./

# Abhängigkeiten installieren
RUN npm install

# Restliche Dateien kopieren
COPY . .

# React Dev-Server starten
CMD ["npm", "start"]

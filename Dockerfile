# ---- Build ----
FROM node:lts AS build
WORKDIR /app

# solo deps primero (mejor cacheo)
COPY package*.json ./
RUN npm ci --omit=dev=false

# copia el código (está en la raíz)
COPY . .
# Si compilas TS/webpack/etc., descomenta:
# RUN npm run build

# ---- Runtime ----
FROM node:lts
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
RUN npm ci --omit=dev
EXPOSE 8080
CMD ["npm","start"]

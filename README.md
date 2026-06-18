# Licorera Backend API

API RESTful para el sistema POS y de gestión de inventarios de una licorera/bodega. Construido con Node.js, Express y PostgreSQL.

## Arquitectura

El proyecto sigue una estricta arquitectura por capas (Layered Architecture) basada en **Principios SOLID**:
- **Controllers** (`/controllers`): Encargados de recibir el Request HTTP y devolver la respuesta JSON en formato estándar.
- **Services** (`/services`): Capa de lógica de negocio pura (validaciones, transacciones).
- **Repositories** (`/repositories`): Capa de acceso a datos. Contienen exclusivamente consultas SQL mediante el driver `pg`.

## Seguridad y Validación
- **Zod:** Validación estricta del Payload entrante (body) mediante middlewares.
- **Helmet:** Protección automática de cabeceras HTTP.
- **Rate-Limiting:** Protección contra ataques DDoS y fuerza bruta limitando a 100 peticiones cada 15 minutos por IP.
- **AppError:** Manejo centralizado de errores para evitar fugas de información.

## Instalación

1. Clona el repositorio.
2. Ve al directorio `backend`.
3. Ejecuta `npm install`.
4. Crea tu archivo `.env` basándote en la estructura necesaria:
   ```env
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=licorera_db
   DB_PASSWORD=tu_password
   DB_PORT=5432
   PORT=3000
   ```
5. Ejecuta `npm run dev` para iniciar el servidor de desarrollo en `http://localhost:3000`.

## Scripts

- `npm start`: Inicia el servidor en modo producción.
- `npm run dev`: Inicia el servidor usando Nodemon (recarga automática).

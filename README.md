# Licorera Backend API

API RESTful para el sistema POS y de gestión de inventarios de una licorera/bodega. Construido con Node.js, Express y PostgreSQL.

## 🏛️ Arquitectura

El proyecto sigue una estricta arquitectura por capas (Layered Architecture) basada en **Principios SOLID**:

- **Routes** (`/routes`): Define los endpoints de la API y asocia los controladores y middlewares (ej. autenticación, validación).
- **Controllers** (`/controllers`): Encargados de recibir el Request HTTP (`req`), extraer los datos, pasarlos al servicio correspondiente y devolver la respuesta HTTP (`res`) en un formato estándar JSON (`{ status, data, message }`). NUNCA ejecutan lógica de negocio.
- **Services** (`/services`): Capa de lógica de negocio pura (validaciones complejas, transacciones de dominio). Lanzan excepciones personalizadas (`AppError`) cuando las reglas de negocio no se cumplen.
- **Repositories** (`/repositories`): Capa de acceso a datos. Contienen exclusivamente consultas SQL mediante el driver `pg`. No contienen lógica de negocio.
- **Middlewares** (`/middlewares`): Interceptores globales como manejo de errores, protección de rutas y rate-limiting.

## 🔒 Seguridad y Validación

- **Zod:** Validación estricta del Payload entrante (body/params) mediante middlewares (`/validations`).
- **Autenticación (JWT):** Generación de tokens para usuarios autenticados. Las rutas privadas están protegidas por el middleware de autenticación.
- **Helmet:** Protección automática de cabeceras HTTP.
- **Rate-Limiting:** Protección contra ataques DDoS limitando a 100 peticiones cada 15 minutos por IP.
- **AppError:** Manejo centralizado de errores (`utils/AppError.js`) para evitar fugas de información de la base de datos hacia el cliente.

## 💻 Instalación Local

1. Ve al directorio `backend`.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura la base de datos ejecutando las tablas ubicadas en `schema.sql`.
4. Crea tu archivo `.env` basándote en la estructura necesaria:
   ```env
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=licorera_db
   DB_PASSWORD=tu_password
   DB_PORT=5432
   PORT=3000
   JWT_SECRET=tu_secreto_jwt
   JWT_EXPIRES_IN=24h
   ```
5. Ejecuta el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

## 📜 Scripts Disponibles

- `npm start`: Inicia el servidor usando Node (para producción).
- `npm run dev`: Inicia el servidor usando Nodemon (recarga automática en desarrollo).

## 🗄️ Base de Datos
Utilizamos **PostgreSQL** y el driver `pg` directamente para maximizar el rendimiento. Todas las consultas son parametrizadas (`$1`, `$2`) para prevenir Inyección SQL.

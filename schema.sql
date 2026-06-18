-- Creación de la base de datos (Ejecutar en postgres root o pgAdmin)
-- CREATE DATABASE licorera_db;
-- \c licorera_db;

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    codigo_barras VARCHAR(100) UNIQUE,
    nombre VARCHAR(255) NOT NULL,
    categoria VARCHAR(100),
    stock_minimo INTEGER DEFAULT 0
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(50),
    tipo_cliente VARCHAR(50) -- ej: 'regular', 'mayorista'
);

CREATE TABLE proveedores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    contacto VARCHAR(255),
    telefono VARCHAR(50)
);

-- Empleados (Recursos Humanos)
CREATE TABLE empleados (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(50),
    rol VARCHAR(50) NOT NULL,
    salario_base DECIMAL(10, 2)
);

-- Usuarios (Personas con acceso al sistema web)
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    empleado_id INTEGER REFERENCES empleados(id) ON DELETE SET NULL, -- Opcional: enlazar usuario a empleado
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(50) DEFAULT 'cajero' -- ej: 'admin', 'cajero'
);

CREATE TABLE unidades_medida (
    id SERIAL PRIMARY KEY,
    producto_id INTEGER REFERENCES productos(id) ON DELETE CASCADE,
    nombre_unidad VARCHAR(50) NOT NULL,
    factor_conversion DECIMAL(10, 4) NOT NULL,
    es_unidad_base BOOLEAN DEFAULT FALSE
);

CREATE TABLE inventario (
    id SERIAL PRIMARY KEY,
    producto_id INTEGER REFERENCES productos(id) ON DELETE CASCADE,
    cantidad_disponible DECIMAL(10, 4) DEFAULT 0
);

CREATE TABLE lista_precios (
    id SERIAL PRIMARY KEY,
    unidad_medida_id INTEGER REFERENCES unidades_medida(id) ON DELETE CASCADE,
    tipo_cliente VARCHAR(50),
    precio DECIMAL(10, 2) NOT NULL
);

CREATE TABLE turnos_caja (
    id SERIAL PRIMARY KEY,
    empleado_id INTEGER REFERENCES empleados(id),
    monto_inicial DECIMAL(10, 2) NOT NULL,
    monto_final_real DECIMAL(10, 2),
    diferencia DECIMAL(10, 2),
    fecha_apertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_cierre TIMESTAMP
);

CREATE TABLE pagos_empleados (
    id SERIAL PRIMARY KEY,
    empleado_id INTEGER REFERENCES empleados(id),
    turno_id INTEGER REFERENCES turnos_caja(id),
    monto DECIMAL(10, 2) NOT NULL,
    tipo_pago VARCHAR(50),
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE compras (
    id SERIAL PRIMARY KEY,
    proveedor_id INTEGER REFERENCES proveedores(id),
    total DECIMAL(10, 2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE detalle_compras (
    id SERIAL PRIMARY KEY,
    compra_id INTEGER REFERENCES compras(id) ON DELETE CASCADE,
    producto_id INTEGER REFERENCES productos(id),
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL
);

CREATE TABLE ventas (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(id),
    empleado_id INTEGER REFERENCES empleados(id),
    total DECIMAL(10, 2) NOT NULL,
    metodo_pago VARCHAR(50),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE detalle_ventas (
    id SERIAL PRIMARY KEY,
    venta_id INTEGER REFERENCES ventas(id) ON DELETE CASCADE,
    producto_id INTEGER REFERENCES productos(id),
    unidad_medida_id INTEGER REFERENCES unidades_medida(id),
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL
);

CREATE TABLE creditos_prestamos (
    id SERIAL PRIMARY KEY,
    venta_id INTEGER REFERENCES ventas(id),
    cliente_id INTEGER REFERENCES clientes(id),
    monto_total DECIMAL(10, 2) NOT NULL,
    monto_pagado DECIMAL(10, 2) DEFAULT 0,
    estado VARCHAR(50) DEFAULT 'pendiente',
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

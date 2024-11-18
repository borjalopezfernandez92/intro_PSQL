# Creación de BD en PostgreSQL

```SQL
-- Crear la base de datos
--CREATE DATABASE prueba;

-- Conectarse a la base de datos
--\c prueba;

-- Crear la tabla Clientes
CREATE TABLE Clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    apellidos VARCHAR(100),
    dni VARCHAR(20) UNIQUE,
    direccion TEXT,
    fecha_nacimiento DATE
);

-- Crear la tabla Productos
CREATE TABLE Productos (
    codigo SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE,
    precio_unitario DECIMAL(10, 2)
);

-- Crear la tabla Proveedores
CREATE TABLE Proveedores (
    nif VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100),
    direccion TEXT
);

-- Crear la tabla Compras para la relación muchos a muchos entre Clientes y Productos
CREATE TABLE Compras (
    id SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES Clientes(id),
    codigo_producto INT REFERENCES Productos(codigo),
    cantidad INT,
    fecha_compra DATE,
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id),
    FOREIGN KEY (codigo_producto) REFERENCES Productos(codigo)
);

-- Crear la tabla Suministros para la relación muchos a muchos entre Productos y Proveedores
CREATE TABLE Suministros (
    id SERIAL PRIMARY KEY,
    codigo_producto INT REFERENCES Productos(codigo),
    nif_proveedor VARCHAR(20) REFERENCES Proveedores(nif),
    FOREIGN KEY (codigo_producto) REFERENCES Productos(codigo),
    FOREIGN KEY (nif_proveedor) REFERENCES Proveedores(nif)
);

-- Inserciones de prueba para la tabla Clientes
INSERT INTO Clientes (nombre, apellidos, dni, direccion, fecha_nacimiento)
VALUES ('Juan', 'García', '12345678A', 'Calle Principal 123', '1990-05-15');

INSERT INTO Clientes (nombre, apellidos, dni, direccion, fecha_nacimiento)
VALUES ('María', 'López', '87654321B', 'Avenida Central 456', '1985-10-20');

INSERT INTO Clientes (nombre, apellidos, dni, direccion, fecha_nacimiento)
VALUES ('Pedro', 'Martínez', '23456789C', 'Plaza Mayor 789', '1978-03-25');

-- Inserciones de prueba para la tabla Productos
INSERT INTO Productos (nombre, precio_unitario)
VALUES ('Camisa', 20.99);

INSERT INTO Productos (nombre, precio_unitario)
VALUES ('Pantalón', 35.50);

INSERT INTO Productos (nombre, precio_unitario)
VALUES ('Zapatos', 49.99);

-- Inserciones de prueba para la tabla Proveedores
INSERT INTO Proveedores (nif, nombre, direccion)
VALUES ('A1234567', 'Proveedor A', 'Calle Proveedor 1');

INSERT INTO Proveedores (nif, nombre, direccion)
VALUES ('B9876543', 'Proveedor B', 'Avenida del Suministro 2');

INSERT INTO Proveedores (nif, nombre, direccion)
VALUES ('C5678901', 'Proveedor C', 'Plaza de los Proveedores 3');

INSERT INTO Compras (id_cliente,codigo_producto,cantidad,fecha_compra)
VALUES (2,3,10,'2023-05-15');

```

## Creación de BD en PostgreSQL

[DOCUMENTACION](https://www.postgresql.org/docs/)

# Ejemplo Vistas

```SQL
-- Creación de las tablas
CREATE TABLE Cliente (
    cliente_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    direccion VARCHAR(200),
    telefono VARCHAR(20)
);

CREATE TABLE Producto (
    producto_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    precio NUMERIC(10, 2)
);

CREATE TABLE Orden (
    orden_id SERIAL PRIMARY KEY,
    cliente_id INT REFERENCES Cliente(cliente_id),
    fecha TIMESTAMP,
    estado VARCHAR(20)
);

CREATE TABLE DetalleOrden (
    detalle_id SERIAL PRIMARY KEY,
    orden_id INT REFERENCES Orden(orden_id),
    producto_id INT REFERENCES Producto(producto_id),
    cantidad INT,
    precio_unitario NUMERIC(10, 2)
);

-- Creación de las vistas
CREATE VIEW VistaCliente AS
SELECT cliente_id, nombre, direccion, telefono FROM Cliente;

CREATE VIEW VistaOrden AS
SELECT o.orden_id, c.nombre AS cliente, o.fecha, o.estado
FROM Orden o
JOIN Cliente c ON o.cliente_id = c.cliente_id;

-- Inserts de ejemplo
INSERT INTO Cliente (nombre, direccion, telefono) VALUES ('Cliente 1', 'Dirección 1', '123456789');
INSERT INTO Cliente (nombre, direccion, telefono) VALUES ('Cliente 2', 'Dirección 2', '987654321');

INSERT INTO Producto (nombre, descripcion, precio) VALUES ('Producto 1', 'Descripción 1', 10.99);
INSERT INTO Producto (nombre, descripcion, precio) VALUES ('Producto 2', 'Descripción 2', 20.50);

INSERT INTO Orden (cliente_id, fecha, estado) VALUES (1, CURRENT_TIMESTAMP, 'Pendiente');
INSERT INTO Orden (cliente_id, fecha, estado) VALUES (2, CURRENT_TIMESTAMP, 'Enviada');

INSERT INTO DetalleOrden (orden_id, producto_id, cantidad, precio_unitario) VALUES (1, 1, 2, 10.99);
INSERT INTO DetalleOrden (orden_id, producto_id, cantidad, precio_unitario) VALUES (2, 2, 1, 20.50);

```

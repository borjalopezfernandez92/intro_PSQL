# Triggers

## Ejercicios:

1. Crea un trigger que permita que no se borre ningún trabajo sin pasarlo a la tabla TrabajosBackup (que debe tener todos los datos del trabajo borrado, incluyendo su id y el usuario que lo borró)
2. Crea trigger que cuando se actualicen los datos de un trabajador en la tabla Personal, permita insertar en una tabla RegistroPersonal.

## Soluciones: 

```SQL
-- EJERCICIO PL-PGSQL 22_2
-- 1. Crea un trigger que permita que no se borre ningún trabajo sin pasarlo a la tabla TrabajosBackup 
-- (que debe tener todos los datos del trabajo borrado, incluyendo su id y el usuario que lo borró)

-- Paso 1: Creación de tabla
CREATE TABLE IF NOT EXISTS TrabajosBackup (
    id SERIAL PRIMARY KEY,
    id_trabajo INTEGER,
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    fk_id_lugar INT,
    fk_id_responsable INT,
    realizado BOOLEAN,
    fecha_borrado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_borrado TEXT
);

-- Paso 2: Creación Trigger
CREATE OR REPLACE FUNCTION guardar_trabajo_borrado()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO TrabajosBackup (id_trabajo, descripcion, fecha_inicio, fecha_fin, fk_id_lugar, fk_id_responsable, realizado, usuario_borrado)
    VALUES (OLD.id, OLD.descripcion, OLD.fecha_inicio, OLD.fecha_fin, OLD.fk_id_lugar, OLD.fk_id_responsable, OLD.realizado, current_user);
    
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER before_delete_trabajo
BEFORE DELETE ON Trabajos
FOR EACH ROW
EXECUTE FUNCTION guardar_trabajo_borrado();

-- Pruebas

INSERT INTO Trabajos(descripcion, fecha_inicio) VALUES('Trabajo Borrar', '2024-04-22');

SELECT * FROM Trabajos;
SELECT * FROM TrabajosBackup;

DELETE FROM Trabajos WHERE id = 10;--El id del que acabo de insertar

SELECT * FROM Trabajos;
SELECT * FROM TrabajosBackup;

-- Crea trigger que cuando se actualicen los datos de un trabajador en la tabla Personal,
-- permita insertar en una tabla RegistroPersonal.

-- Paso 1: Creación de la tabla
CREATE TABLE IF NOT EXISTS RegistroPersonal (
    id SERIAL PRIMARY KEY,
	id_personal INTEGER,
    nombre VARCHAR(100),
    cargo VARCHAR(100),
	descripcion_accion VARCHAR(100),
    fecha_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_update TEXT
);

-- Paso 2: Creación del Trigger

CREATE OR REPLACE FUNCTION guardar_personal_update()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO RegistroPersonal (id_personal, nombre, cargo, descripcion_accion, usuario_update)
    VALUES (OLD.id, OLD.nombre, OLD.cargo, 'Datos antiguos', current_user);
    INSERT INTO RegistroPersonal (id_personal, nombre, cargo, descripcion_accion, usuario_update)
    VALUES (NEW.id, NEW.nombre, NEW.cargo, 'Datos nuevos', current_user);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER before_update_personal
BEFORE UPDATE ON Personal
FOR EACH ROW
EXECUTE FUNCTION guardar_personal_update();


-- Pruebas
SELECT * FROM Personal;
SELECT * FROM RegistroPersonal;

UPDATE Personal
SET nombre = 'Pedro'
WHERE id = 2;

SELECT * FROM Personal;
SELECT * FROM RegistroPersonal;
```
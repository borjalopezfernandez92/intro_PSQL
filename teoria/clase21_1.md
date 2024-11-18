# Funciones en la BD

## Ejemplo: Calculo de promedio usando SELECT y un bucle: 

```SQL
CREATE OR REPLACE FUNCTION calcular_promedio_ventas()
RETURNS DECIMAL AS $$
DECLARE
    total DECIMAL := 0;
    cantidad INTEGER := 0;
    promedio DECIMAL := 0;
    venta_actual RECORD;
BEGIN
    -- Iteramos sobre todas las ventas y sumamos los montos
    FOR venta_actual IN SELECT monto FROM ventas LOOP
        total := total + venta_actual.monto;
        cantidad := cantidad + 1;
    END LOOP;

    -- Calculamos el promedio
    IF cantidad > 0 THEN
        promedio := total / cantidad;
    ELSE
        RAISE EXCEPTION 'No hay ventas en la tabla.';
    END IF;

    RETURN promedio;
END;
$$ LANGUAGE plpgsql;

```

## Ejercicios: 

1. Crea una función que devuelva la cantidad de trabajos realizados.
2. Crea una función que devuelva la media de trabajos realizados y otra la media de trabajos que no se han realizado aún (presupuesto)
3. Crea una función que devuelva la media de trabajos de un cliente pasado por parámetro.

## Soluciones

```SQL

-- EJERCICIOS PL-PGSQL 21_1

-- 1. Crea una función que devuelva la cantidad de trabajos realizados.

CREATE OR REPLACE FUNCTION trabajos_realizados()
RETURNS TABLE (
    identificador INT,
    des TEXT,
    inicio DATE,
    fin DATE,
    id_lugar INT,
    id_responsable INT,
    hecho BOOLEAN
)
AS $$
BEGIN
    RETURN QUERY
    SELECT id, descripcion, fecha_inicio, fecha_fin, fk_id_lugar, fk_id_responsable, realizado
    FROM Trabajos
    WHERE realizado = true;
END;
$$ LANGUAGE plpgsql;

UPDATE Trabajos SET realizado = true WHERE id = 3 or id = 7;
SELECT identificador,des,inicio,fin,id_lugar,id_responsable,hecho
FROM trabajos_realizados();

-- 2. Crea una función que devuelva la media de trabajos realizados y otra la media de trabajos que no se han realizado aún (presupuesto)
CREATE OR REPLACE FUNCTION trabajos_realizados_presupuesto()
RETURNS FLOAT
AS $$
DECLARE 
	r FLOAT;
BEGIN
    SELECT AVG(presupuesto) INTO r
	FROM CitasEvaluacion
	JOIN Trabajos ON Trabajos.id = CitasEvaluacion.fk_id_trabajo AND realizado = true;
	RETURN r;
END;
$$ LANGUAGE plpgsql;

SELECT trabajos_realizados_presupuesto();

-- 3. Crea una función que devuelva la media de trabajos de un cliente pasado por parámetro.

CREATE OR REPLACE FUNCTION media_trabajos()
RETURNS TABLE (
    id_cliente INT,
    media NUMERIC
)
AS $$
BEGIN
    RETURN QUERY
    SELECT CitasEvaluacion.fk_id_cliente, AVG(presupuesto)
	FROM CitasEvaluacion
	JOIN Trabajos ON Trabajos.id = CitasEvaluacion.fk_id_trabajo AND realizado = false
	GROUP BY CitasEvaluacion.fk_id_cliente;
END;
$$ LANGUAGE plpgsql;

SELECT id_cliente, media
FROM media_trabajos();

-- Versión 2
DROP FUNCTION  media_trabajos_id;
CREATE OR REPLACE FUNCTION media_trabajos_id(id_cliente INTEGER)
RETURNS TABLE (
    cliente INT,
    media NUMERIC
)
AS $$
BEGIN
    RETURN QUERY
    SELECT CitasEvaluacion.fk_id_cliente, AVG(presupuesto)
	FROM CitasEvaluacion
	JOIN Trabajos ON Trabajos.id = CitasEvaluacion.fk_id_trabajo AND realizado = true AND Trabajos.fk_id_cliente = id_cliente
	GROUP BY CitasEvaluacion.fk_id_cliente;
END;
$$ LANGUAGE plpgsql;

SELECT cliente, media
FROM media_trabajos_id(2);

SELECT * FROM Trabajos;
SELECT * FROM CitasEvaluacion;

UPDATE CitasEvaluacion SET fk_id_trabajo = 7 WHERE id = 2;
UPDATE Trabajos SET fk_id_cliente = 2 WHERE id = 7;




```
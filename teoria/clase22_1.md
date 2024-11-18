# Procedimientos en la BD

## Ejemplo: Cálculo e inserción de total de ventas.

```SQL
CREATE OR REPLACE PROCEDURE calcular_insertar_resumen_ventas()
AS $$
DECLARE
    fecha_actual DATE;
    total_venta DECIMAL;
BEGIN
    -- Iteramos sobre todas las fechas distintas en la tabla ventas
    FOR fecha_actual IN SELECT DISTINCT fecha FROM ventas LOOP
        -- Calculamos el total de ventas para la fecha actual
        SELECT SUM(monto) INTO total_venta FROM ventas WHERE fecha = fecha_actual;

        -- Insertamos el resumen de ventas en la tabla resumen_ventas
        INSERT INTO resumen_ventas(fecha, total_ventas) VALUES (fecha_actual, total_venta);
    END LOOP;
END;
$$ LANGUAGE plpgsql;

```

## Ejercicios:

1. Crea un procedimiento que dado un responsable y un trabajo pasado por parámetro, reasigne el responsable al trabajo.
2. Crea un procedimiento que aumente el presupuesto de las citas posteriores al 1 de enero de 2023.
3. Crea un procedimiento que asigne un lugar, cuya ciudad recibe por parámtros, a los trabajos de citas impares.

## Soluciones

```SQL
-- EJERCICIOS PL-PGSQL 22_1

-- 1. Crea un procedimiento que dado un responsable y un trabajo pasado por parámetro, reasigne el responsable al trabajo.
CREATE OR REPLACE PROCEDURE reasignar_responsable(
    IN p_id_trabajo INTEGER,
    IN p_id_nuevo_responsable INTEGER
)
AS $$
BEGIN
    UPDATE Trabajos
    SET fk_id_responsable = p_id_nuevo_responsable
    WHERE id = p_id_trabajo;
    
    RAISE NOTICE 'Se ha reasignado el responsable del trabajo % al responsable con ID %', p_id_trabajo, p_id_nuevo_responsable;
END;
$$ LANGUAGE plpgsql;

CALL reasignar_responsable(8,2);
SELECT * FROM Trabajos;

-- 2. Crea un procedimiento que aumente el presupuesto de las citas posteriores al 1 de enero de 2023.

CREATE OR REPLACE PROCEDURE aumentar_presupuesto(IN aumento FLOAT)
AS $$
BEGIN
    UPDATE CitasEvaluacion
    SET presupuesto = presupuesto + aumento
    WHERE fecha > '2023-01-01';
END;
$$ LANGUAGE plpgsql;

SELECT * FROM CitasEvaluacion;
CALL aumentar_presupuesto(100);
SELECT * FROM CitasEvaluacion;

-- 3. Crea un procedimiento que asigne un lugar, cuya ciudad recibe por parémtros, a los trabajos de citas impares.
CREATE OR REPLACE PROCEDURE asignar_lugar(p_ciudad VARCHAR(100))
AS $$
DECLARE
	id_lugar INTEGER;
BEGIN
	SELECT id INTO id_lugar FROM Lugares WHERE ciudad = p_ciudad;
    UPDATE Trabajos
    SET fk_id_lugar = id_lugar
    WHERE id IN (SELECT fk_id_trabajo FROM CitasEvaluacion WHERE id % 2 = 1);
END;
$$ LANGUAGE plpgsql;

CALL asignar_lugar('Ciudad B');

SELECT * FROM Trabajos;

```
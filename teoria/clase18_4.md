# Introducción PLSQL

## Bloques Anónimos:

Los bloques anónimos en PL/pgSQL se definen con la palabra clave DECLARE y pueden contener variables, declaraciones de tipo, sentencias de control de flujo y sentencias SQL.

Ejemplo de un bloque anónimo simple que muestra un mensaje:

```SQL
DO $$
DECLARE
  mensaje TEXT;
BEGIN
  mensaje := 'Hola, mundo!';
  RAISE NOTICE '%', mensaje;
END $$;

```

## Variables:

Puedes declarar variables en PL/pgSQL para almacenar valores temporales. Las variables pueden tener diferentes tipos de datos como INTEGER, TEXT, DATE, etc.

Ejemplo de declaración y uso de variables:

```SQL
DO $$
DECLARE
  nombre_empleado TEXT := 'Juan';
  salario NUMERIC := 3000;
BEGIN
  RAISE NOTICE 'El salario de % es %', nombre_empleado, salario;
END $$;
```

## Mostrar información:

Para mostrar información desde un bloque anónimo en PostgreSQL, puedes usar la función RAISE NOTICE.

## Sentencias de Control de Flujo:

PL/pgSQL admite sentencias de control de flujo como IF-THEN-ELSE, CASE, LOOP, WHILE, etc. Estas sentencias te permiten controlar la ejecución del código en función de condiciones específicas.

Ejemplo de uso de IF-THEN-ELSE:

```SQL
DO $$
DECLARE
  numero INT := 10;
BEGIN
  IF numero > 0 THEN
    RAISE NOTICE 'El número es positivo.';
  ELSE
    RAISE NOTICE 'El número es negativo o cero.';
  END IF;
END $$;

```

## Triggers

Tipos de Triggers:

- BEFORE: Se activa antes de que se realice la operación en la tabla.
- AFTER: Se activa después de que se ha realizado la operación en la tabla.

Referencia a Columnas:

Dentro de un trigger, puedes acceder a los valores de las columnas de la fila afectada utilizando las palabras clave NEW y OLD. NEW contiene los nuevos valores de la fila después de un INSERT o UPDATE, mientras que OLD contiene los valores anteriores antes de un UPDATE o DELETE.

```SQL
CREATE OR REPLACE FUNCTION validar_datos()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.cantidad < 0 THEN
    RAISE EXCEPTION 'La cantidad no puede ser negativa.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validar_datos_trigger
BEFORE INSERT ON mi_tabla
FOR EACH ROW EXECUTE FUNCTION validar_datos();

```

## Ejercicios

1. Crea los triggers necesarios y las tablas necesarias para resolver lo siguiente:

- Cuando se produce una acción (inserción o borrado) en una tabla Clientes (que contiene id, nombre, telefono y DNI) se pase la información a otra tabla que se va a llamar Copia_Clientes

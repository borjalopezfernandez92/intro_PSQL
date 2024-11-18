# PL/PGSQL

## Funciones

```SQL
CREATE OR REPLACE FUNCTION saludar_mundo()
RETURNS TEXT AS $$
BEGIN
  RETURN 'Hola, mundo';
END;
$$ LANGUAGE plpgsql;

SELECT saludar_mundo();

CREATE OR REPLACE FUNCTION saludar(nombre TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN 'Hola ' || nombre;
END;
$$ LANGUAGE plpgsql;

SELECT saludar('Juan');

CREATE OR REPLACE FUNCTION sumar_enteros(a INTEGER, b INTEGER)
RETURNS INTEGER AS $$
DECLARE
  resultado INTEGER;
BEGIN
  resultado := a + b;
  RETURN resultado;
END;
$$ LANGUAGE plpgsql;

SELECT sumar_enteros(3, 5);

```

## Procedimientos

```SQL
CREATE OR REPLACE PROCEDURE mostrar_mensaje()
AS $$
BEGIN
  RAISE NOTICE 'Hola, mundo';
END;
$$ LANGUAGE plpgsql;

CALL mostrar_mensaje();

CREATE OR REPLACE PROCEDURE mostrar_saludo(nombre TEXT)
AS $$
BEGIN
  RAISE NOTICE 'Hola %', nombre;
END;
$$ LANGUAGE plpgsql;

CALL mostrar_saludo('Juan');

CREATE OR REPLACE PROCEDURE mostrar_suma(a INTEGER, b INTEGER)
AS $$
DECLARE
  resultado INTEGER;
BEGIN
  resultado := a + b;
  RAISE NOTICE 'La suma de % y % es %', a, b, resultado;
END;
$$ LANGUAGE plpgsql;

CALL mostrar_suma(3, 5);

CREATE OR REPLACE PROCEDURE obtener_suma(a INTEGER, b INTEGER, OUT suma INTEGER)
AS $$
BEGIN
  suma := a + b;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  suma INTEGER;
BEGIN
CALL obtener_suma(3, 5, suma);
RAISE NOTICE 'Valor de suma: %', suma;

END $$;


```

## Ejercicios

1. Crea un procedimiento y una función que calculen el área de un círculo.
2. Crea un procedimiento y una función que indiquen si un número pasado por parámetros es par o impar.
3. Crea un procedimiento que permita devolver la suma, resta, multiplicación y división de dos números.
4. Crea un procedimiento que permita recibir un número, sumarle 100 y devolverlo modificado.

## Triggers

[Documentacion](https://www.postgresql.org/docs/current/sql-createtrigger.html)


## Soluciones ejercicios

```SQL
-- EJERCICIOS PL-PGSQL

-- 1. Crea un procedimiento y una función que calculen el área de un círculo.
-- 1.1 Procedimiento
CREATE OR REPLACE PROCEDURE area_circulo(radio DECIMAL(6,2))
AS $$
DECLARE
  area DECIMAL(6,2);
  pi CONSTANT NUMERIC := 3.14159265358979323846;
BEGIN
	area := pi * radio ^ 2; 
  	RAISE NOTICE 'El area del circulo es %', area;
END;
$$ LANGUAGE plpgsql;

CALL area_circulo(2.1);

-- 1.2 Función
CREATE OR REPLACE FUNCTION area_circulo_2(radio DECIMAL(6,2))
RETURNS DECIMAL(6,2) AS $$
DECLARE
  pi CONSTANT NUMERIC := 3.14159265358979323846;
BEGIN
	RETURN pi * radio ^ 2; 
END;
$$ LANGUAGE plpgsql;

SELECT area_circulo_2(2.1);

-- 2. Crea un procedimiento y una función que indiquen si un número pasado por parámetros es par o impar.

-- 2.1 Procedimiento
CREATE OR REPLACE PROCEDURE par_impar(numero INTEGER)
AS $$
BEGIN
	IF numero % 2 = 0 THEN
    	RAISE NOTICE 'El numero es par';
	ELSE 
    	RAISE NOTICE 'El numero es impar';
	END IF;
END;
$$ LANGUAGE plpgsql;

CALL par_impar(1400);
CALL par_impar(1401);

-- 1.2 Función
CREATE OR REPLACE FUNCTION par_impar_2(numero INTEGER)
RETURNS BOOLEAN AS $$
BEGIN
	RETURN numero % 2 = 0;
END;
$$ LANGUAGE plpgsql;


DO $$

BEGIN
	IF par_impar_2(324) THEN
    	RAISE NOTICE 'El numero es par';
	ELSE 
    	RAISE NOTICE 'El numero es impar';
	END IF;
	IF par_impar_2(15) THEN
    	RAISE NOTICE 'El numero es par';
	ELSE 
    	RAISE NOTICE 'El numero es impar';
	END IF;

END $$;

-- 3. Crea un procedimiento que permita devolver la suma, resta, multiplicación y división de dos números.

CREATE OR REPLACE PROCEDURE calculadora(
    IN num1 INTEGER,
    IN num2 INTEGER,
    OUT suma INTEGER,
    OUT resta INTEGER,
    OUT multiplicacion INTEGER,
    OUT division FLOAT
)
AS $$
BEGIN
    suma := num1 + num2;  
    resta := num1 - num2;
    multiplicacion := num1 * num2;
    IF num2 = 0 THEN
        division := NULL; -- Evita la división por cero, que no existe
    ELSE
        division := num1::FLOAT / num2;
    END IF;
END;
$$ LANGUAGE plpgsql;


DO $$
DECLARE
	suma INTEGER;
	resta INTEGER;
	multiplicacion INTEGER;
	division FLOAT;
	n1 INTEGER DEFAULT 1300;
	n2 INTEGER DEFAULT 10;

BEGIN
	CALL calculadora(n1,n2,suma, resta, multiplicacion, division);
	RAISE NOTICE 'Suma: %', suma;
    RAISE NOTICE 'Resta: %', resta;
    RAISE NOTICE 'Multiplicación: %', multiplicacion;
    RAISE NOTICE 'División: %', division;
	CALL calculadora(3,7,suma, resta, multiplicacion, division);
    RAISE NOTICE 'Suma: %', suma;
    RAISE NOTICE 'Resta: %', resta;
    RAISE NOTICE 'Multiplicación: %', multiplicacion;
    RAISE NOTICE 'División: %', division;
END $$;

-- 4. Crea un procedimiento que permita recibir un número, sumarle 100 y devolverlo modificado.
CREATE OR REPLACE PROCEDURE suma_100(INOUT resultado INTEGER)
AS $$
BEGIN
    resultado := resultado + 100;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
	n INTEGER DEFAULT 100;
BEGIN
	CALL suma_100(n);
	RAISE NOTICE 'Numero: %', n;
	CALL suma_100(n);
	RAISE NOTICE 'Numero: %', n;
	CALL suma_100(n);
	RAISE NOTICE 'Numero: %', n;
END $$;

```
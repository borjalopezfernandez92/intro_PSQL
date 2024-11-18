# JOIN en PostgreSQL

Son operaciones que se utilizan para combinar filas de dos o más tablas en función de una relación entre ellas. Hay varios tipos de JOIN, pero los más comunes son INNER JOIN, LEFT JOIN, RIGHT JOIN y FULL JOIN.

## INNER JOIN:

Devuelve solo las filas que tienen una correspondencia en ambas tablas.

```SQL
SELECT columnas
FROM tabla1
INNER JOIN tabla2 ON tabla1.columna = tabla2.columna;
```

En este ejemplo, solo se devolverán las filas donde haya una coincidencia entre tabla1 y tabla2 en la columna especificada.

## LEFT JOIN:

Devuelve todas las filas de la tabla izquierda (primera tabla mencionada en la consulta) y las filas coincidentes de la tabla derecha (segunda tabla mencionada en la consulta). Si no hay coincidencias en la tabla derecha, devuelve NULL.

```SQL
SELECT columnas
FROM tabla1
LEFT JOIN tabla2 ON tabla1.columna = tabla2.columna;
```

En este caso, se devuelven todas las filas de tabla1 y las filas coincidentes de tabla2, si las hay.

## RIGHT JOIN:

Es similar a LEFT JOIN, pero devuelve todas las filas de la tabla derecha y las filas coincidentes de la tabla izquierda. Si no hay coincidencias en la tabla izquierda, devuelve NULL.

```SQL
SELECT columnas
FROM tabla1
RIGHT JOIN tabla2 ON tabla1.columna = tabla2.columna;

```

Este tipo de JOIN puede ser menos común, ya que generalmente se pueden obtener los mismos resultados intercambiando el orden de las tablas y usando LEFT JOIN.

## FULL JOIN:

Devuelve todas las filas cuando hay una coincidencia en una de las tablas. Si no hay coincidencias, devuelve NULL en las columnas de la tabla que no tiene coincidencias.

```SQL
SELECT columnas
FROM tabla1
FULL JOIN tabla2 ON tabla1.columna = tabla2.columna;
```

El FULL JOIN devuelve todas las filas de ambas tablas, combinando las filas donde sea posible y completando con NULL donde no haya coincidencias.

## Ejemplos

```SQL
SELECT c.nombre AS cliente, o.orden_id, o.fecha, o.estado
FROM Orden o
INNER JOIN Cliente c ON o.cliente_id = c.cliente_id;


SELECT o.orden_id, p.nombre AS producto, d.cantidad, d.precio_unitario
FROM DetalleOrden d
INNER JOIN Orden o ON d.orden_id = o.orden_id
INNER JOIN Producto p ON d.producto_id = p.producto_id;


SELECT c.nombre AS cliente, o.orden_id, o.fecha, o.estado
FROM Orden o
LEFT JOIN Cliente c ON o.cliente_id = c.cliente_id;

```

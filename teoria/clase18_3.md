# GROUP BY Y HAVING

## GROUP BY:

Esta cláusula se utiliza para agrupar filas que tienen el mismo valor en una o más columnas. Se utiliza junto con funciones de agregación como SUM, COUNT, AVG, etc., para realizar cálculos en cada grupo.

Ejemplo: Supongamos que queremos saber cuántas órdenes ha realizado cada cliente:

```SQL
SELECT cliente_id, COUNT(orden_id) AS total_ordenes
FROM Orden
GROUP BY cliente_id;

```

En este ejemplo, agrupamos las órdenes por el cliente_id y contamos cuántas órdenes tiene cada cliente.

## HAVING

Después de aplicar GROUP BY, HAVING se utiliza para filtrar grupos basados en una condición específica.

Ejemplo: Supongamos que queremos encontrar los clientes que hayan realizado más de 3 órdenes:

```SQL
SELECT cliente_id, COUNT(orden_id) AS total_ordenes
FROM Orden
GROUP BY cliente_id
HAVING COUNT(orden_id) > 3;

```

En este ejemplo, primero agrupamos las órdenes por cliente_id y luego filtramos los grupos utilizando la condición HAVING COUNT(orden_id) > 3, lo que significa que solo seleccionaremos los grupos donde el número de órdenes sea mayor que 3.

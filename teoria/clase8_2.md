# Introducción a PostgreSQL

## Conexion con la terminal de BD:

Antes de realizar este paso debemos arrancar Odoo y haber llegado a realizar el acceso.

```sh
su postgres
psql
```

## Ver las Bases de Datos

```sh
\l

```

## Conectar a una Base de Datos concreta

```sh
\c BD

```

## Ver todas las tablas

```
\dt
```

## Ver la estructura de una tabla

```sh
\d tabla
```

## Ver el contenido de una tabla

```sh
\x # Con esta instruccion damos estructura a la salida de datos
select * from tabla;
```

## Salir de la terminal (psql) y del usuario

```
\q
exit
```

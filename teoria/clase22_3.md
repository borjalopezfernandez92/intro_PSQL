# Gestión de usuarios en PostgreSQL

## Creación de usuarios

Veamos un ejemplo:

```SQL
CREATE USER nombre_usuario WITH PASSWORD 'contraseña';

```

## Asignación de permisos

```SQL
GRANT permiso1, permiso2 ON nombre_basedatos TO nombre_usuario; --Base de Datos
GRANT SELECT, INSERT, UPDATE ON empleados TO usuario_empleados; --Tabla
```

## Permisos:

1. SELECT: Permite al usuario seleccionar datos de la tabla.
2. INSERT: Permite al usuario insertar nuevos registros en la tabla.
3. UPDATE: Permite al usuario actualizar registros existentes en la tabla.
4. DELETE: Permite al usuario eliminar registros de la tabla.
5. TRUNCATE: Permite al usuario truncar la tabla, eliminando todos los registros.
6. REFERENCES: Permite al usuario crear una clave externa que haga referencia a la tabla.
7. TRIGGER: Permite al usuario crear triggers en la tabla.
8. ALL PRIVILEGES: Otorga todos los permisos disponibles en la tabla.

## Revocar permisos:

```SQL
REVOKE permiso1, permiso2 ON nombre_basedatos FROM nombre_usuario; -- Base de datos
REVOKE INSERT, UPDATE ON empleados FROM usuario_empleados; -- Tabla
```

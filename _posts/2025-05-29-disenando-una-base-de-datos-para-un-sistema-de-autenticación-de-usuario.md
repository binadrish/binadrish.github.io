---
layout: post
title: "Diseñando de una base de datos para un sistema de autenticación de usuario"
excerpt: "Descubre como utilizar uno de los identificadores más utilizados en la actualidad"
author: "Adrian Galvan R."
date: 2025-05-29
categories: [artículo, Bases de datos]
img: "https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
---

El objetivo principal de implementar un sistema de autenticación es identificar de manera única a los usuarios que interactúan con una plataforma. Esta identificación permite ofrecer una experiencia personalizada, restringir el acceso a ciertas funcionalidades según el nivel de permisos del usuario y, en general, mantener la integridad y seguridad del sistema.
## Eligiendo un identificador

Dado que el usuario es el actor principal dentro del sistema, una de las primeras decisiones de diseño que debemos tomar es: **¿Cómo lo vamos a autenticar?** 

Independientemente de qué información adicional decidamos almacenar, todo sistema de autenticación tiene un identificador de usuario, y debe cumplir ciertas propiedades esenciales:

- **Unicidad:** Cada usuario debe tener un identificador exclusivo.
    
- **Inmutabilidad:** El identificador no debe cambiar con el tiempo.
    
- **Consistencia:** Debe poder usarse como referencia confiable en otros sistemas (como sesiones, tokens o logs).

En general, los sistemas usan identificadores **no secuenciales** (como UUIDs) o **secuenciales** (auto-incrementales), y a veces soluciones híbridas (Snowflake, ULID) que combinan marca de tiempo y componentes aleatorios. Estas opciones garantizan unicidad, escalabilidad y, en muchos casos, permiten ordenar registros por fecha de creación de forma natural.

En este artículo no profundizamos cada uno, pero es importante tenerlos en cuenta a la hora de construir tus bases de datos.

En primera instancia podría ser tentador optar por utilizar, por ejemplo, el correo electrónico como ID, es único de eso podemos estar seguros, pero podemos enumerar algunas aspectos que no se solventan:

1. **Pueden cambiar**: El correo o nombre de usuario no son inmutables; si cambian, habría que actualizar múltiples registros.
    
2. **No garantizan unicidad global**: Atributos como el nombre pueden repetirse y no son únicos en todos los contextos.
    
3. **Exponen datos sensibles**: Usarlos en rutas o tokens puede comprometer la privacidad del usuario.
    
4. **Rompen la separación lógica**: Mezclan la lógica interna del sistema con atributos orientados al usuario o interfaz.
    
5. **Dificultan integraciones**: Si cambian, pueden romper referencias en otras tablas o sistemas conectados.

Por eso, se recomienda usar un identificador abstracto, como un número secuencial o UUID, que sea **único, inmutable y sin significado personal**.

## Tokens de autenticación

Un **token** en el contexto de un sistema de autenticación de usuarios es una **cadena de texto** (generalmente en formato codificado como JWT - JSON Web Token) que representa de forma segura la **identidad de un usuario autenticado**. Su propósito principal es permitir que un sistema reconozca a un usuario después de que ha iniciado sesión, sin necesidad de pedirle las credenciales constantemente.
### ¿Qué contiene un token?

Un token típicamente incluye:

- **Identificador del usuario** (por ejemplo, su ID).
    
- **Tiempo de expiración** (cuándo deja de ser válido).
    
- **Datos adicionales** (como roles, permisos o claims personalizados).
    
- **Firma digital** (para evitar que sea alterado por terceros).

### ¿Cómo funciona en un flujo de inicio de sesión?

1. **Inicio de sesión:**  
    El usuario envía su correo y contraseña al backend.
    
2. **Validación:**  
    El backend verifica las credenciales. Si son correctas, **genera un token** y lo envía de vuelta al cliente (por ejemplo, una app o el navegador).
    
3. **Almacenamiento:**  
    El cliente guarda el token (usualmente en `localStorage`, `sessionStorage` o en una cookie segura).
    
4. **Acceso a recursos protegidos:**  
    En siguientes peticiones, el cliente envía el token en los headers (como `Authorization: Bearer <token>`), y el backend lo **valida** para permitir el acceso.
    
5. **Expiración o cierre de sesión:**  
    Si el token expira o el usuario cierra sesión, ya no será válido y el usuario deberá autenticarse nuevamente.

## Diseño de la base de datos

Una vez definido que tipo de identificador se va a utilizar,  averigua ¿Qué información del usuario vas a almacenar (y cómo)?, esto va a depender de las características de los servicios que se ofrecen detrás del inicio de sesión, pero de manera general podemos considerar los siguientes elementos:
### Tabla: `user`

| Campo           | Tipo de dato               | Descripción                                                  |
| --------------- | -------------------------- | ------------------------------------------------------------ |
| `id`            | `UUID` o `SERIAL`          | Identificador único. UUID recomendado para escalabilidad.    |
| `email`         | `VARCHAR(255)`             | Correo del usuario, debe ser único y obligatorio.            |
| `password_hash` | `VARCHAR(255)`             | Almacena el hash seguro de la contraseña.                    |
| `created_at`    | `TIMESTAMP WITH TIME ZONE` | Fecha de creación del usuario.                               |
| `updated_at`    | `TIMESTAMP WITH TIME ZONE` | Última actualización. Puede usarse con triggers.             |
| `is_active`     | `BOOLEAN`                  | Estado activo/inactivo de la cuenta.                         |
| `role`          | `VARCHAR(50)`              | Rol del usuario, útil para autorización (user, admin, etc.). |

Si contemplamos desde un inicio el uso de tokens en nuestro sistema para mantener al usuario autenticado mientras navega, hay que relacionar los tokens con los usuarios, declaramos que **cada usuario puede tener n cantidad de tokens** y **un token solo puede estar enlazado a un solo usuario**, en la siguiente tabla podemos ver una propuesta que se acopla con nuestra entidad `user` y permitiría implementar tokens en un sistema de autenticación:
### Tabla: `token`

| Campo        | Tipo de dato               | Descripción                                               |
| ------------ | -------------------------- | --------------------------------------------------------- |
| `id`         | `UUID`                     | Identificador único del token.                            |
| `user_id`    | `UUID`                     | Relación con la tabla `users`. Clave foránea.             |
| `token`      | `TEXT`                     | El valor del token. Puede ser JWT o string generado.      |
| `type`       | `VARCHAR(50)`              | Define el propósito del token.                            |
| `expires_at` | `TIMESTAMP WITH TIME ZONE` | Fecha y hora de expiración.                               |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | Fecha en que fue generado el token.                       |
| `revoked`    | `BOOLEAN`                  | Indica si el token fue invalidado antes de su expiración. |

Este acercamiento es un buen punto de partida para el diseño de una base de datos para un sistema de autenticación de usuario, sin embargo es interesante investigar que hay otras extensiones comúnmente utilizadas para fortalecerlo:

Para un proyecto pequeño, esto debería ser suficiente para empezar a validar usuarios, sin embargo, existen otras entidades normalmente utilizadas para escalar el sistema de autenticación ejemplo:

- Tabla de `password_resets` para recuperación de contraseña.
    
- Tabla de `login_attempts` o `audit_logs` para registrar actividad.
    
- `two_factor_enabled`, `phone_number`, etc. para MFA.

En resumen, un buen diseño de base de datos para un sistema de autenticación no solo parte de elegir el identificador adecuado (UUID, secuencial o híbrido), sino también de estructurar de forma coherente las entidades que soportan el flujo completo de seguridad: usuarios, tokens, restablecimientos de contraseña, verificaciones de correo y registros de actividad. Aplicar hashing fuerte (bcrypt, Argon2), políticas de expiración y revocación de tokens, y mecanismos de auditoría y MFA refuerza la resiliencia ante ataques y facilita el mantenimiento a largo plazo. Con esta base sólida, tu plataforma podrá escalar con confianza, adaptarse a nuevos requisitos de negocio y garantizar la protección de la información de tus usuarios.
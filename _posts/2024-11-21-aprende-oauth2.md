---
layout: post
title: "Aprende Oauth2.0"
excerpt: "Entremos en el mundo de la autenticación con Oauth2.0"
author: "Adrian Galvan R."
date: 2024-11-21
categories: [artículo]
img: "https://images.unsplash.com/photo-1635237393049-55046279ebb8?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
---

**OAuth 2.0** es un protocolo de autorización ampliamente utilizado que permite a las aplicaciones acceder a recursos protegidos en nombre de un usuario, sin necesidad de compartir las credenciales del usuario (como su nombre de usuario y contraseña). Es el estándar de facto para la autorización en aplicaciones web, móviles y de escritorio.

### Documentación Oficial
Para más detalles y ejemplos, puedes consultar la [documentación oficial de `OAuth 2.0`](https://developers.google.com/identity/openid-connect/openid-connect).
### ¿Por qué se usa OAuth 2.0?
OAuth 2.0 resuelve el problema de permitir que aplicaciones de terceros accedan a recursos protegidos (como datos de Google, Facebook, GitHub, etc.) sin exponer las credenciales del usuario. En lugar de compartir la contraseña, el usuario otorga permisos específicos a la aplicación para acceder a sus datos.

---

### Componentes principales de OAuth 2.0

1. **Cliente (Client)**:
   - La aplicación que solicita acceso a los recursos protegidos.
   - Por ejemplo, una aplicación Node.js que quiere acceder a los datos de Google Drive de un usuario.

2. **Servidor de recursos (Resource Server)**:
   - El servidor que aloja los recursos protegidos.
   - Por ejemplo, los servidores de Google Drive que almacenan los archivos del usuario.

3. **Servidor de autorización (Authorization Server)**:
   - El servidor que gestiona la autenticación y autorización del usuario.
   - Por ejemplo, los servidores de Google que manejan el flujo de OAuth 2.0.

4. **Propietario del recurso (Resource Owner)**:
   - El usuario que posee los recursos y puede conceder o denegar el acceso a ellos.
   - Por ejemplo, tú, como usuario de Google Drive.

5. **Token de acceso (Access Token)**:
   - Una cadena de caracteres que representa la autorización concedida al cliente para acceder a los recursos.
   - Es temporal y tiene un tiempo de vida limitado.

6. **Token de actualización (Refresh Token)**:
   - Un token opcional que se utiliza para obtener nuevos tokens de acceso cuando el actual expira.

---

### Flujo básico de OAuth 2.0

1. **Solicitud de autorización**:
   - El cliente redirige al usuario al servidor de autorización para que este conceda permisos.
   - Ejemplo: "¿Permites que esta aplicación acceda a tus archivos de Google Drive?".

2. **Concesión de autorización**:
   - El usuario acepta o rechaza la solicitud.
   - Si acepta, el servidor de autorización devuelve un **código de autorización** al cliente.

3. **Intercambio del código por un token de acceso**:
   - El cliente envía el código de autorización al servidor de autorización para obtener un **token de acceso**.

4. **Acceso a los recursos protegidos**:
   - El cliente usa el token de acceso para solicitar datos al servidor de recursos.
   - El servidor de recursos verifica el token y devuelve los datos solicitados.

5. **Actualización del token (opcional)**:
   - Si el token de acceso expira, el cliente puede usar un **token de actualización** para obtener un nuevo token de acceso sin requerir la interacción del usuario.

---

### Ejemplo práctico con Google APIs

Cuando usas `google-api-nodejs-client`, el flujo de OAuth 2.0 se maneja de la siguiente manera:

1. **Configuración del cliente OAuth 2.0**:
   - Registras tu aplicación en Google Cloud Console para obtener un **ID de cliente** y un **secreto de cliente**.
   - Configuras una URL de redireccionamiento.

2. **Solicitud de autorización**:
   - Rediriges al usuario a la página de autorización de Google.
   - El usuario inicia sesión y concede permisos.

3. **Intercambio del código por un token**:
   - Google redirige al usuario de vuelta a tu aplicación con un **código de autorización**.
   - Tu aplicación intercambia este código por un **token de acceso** y un **token de actualización**.

4. **Uso del token de acceso**:
   - Usas el token de acceso para hacer solicitudes a las APIs de Google, como Google Drive o Gmail.

---

### Ventajas de OAuth 2.0

- **Seguridad**: No se comparten credenciales del usuario.
- **Control granular**: El usuario puede conceder permisos específicos (por ejemplo, solo lectura o escritura).
- **Escalabilidad**: Funciona bien en aplicaciones web, móviles y de escritorio.
- **Estándar abierto**: Es ampliamente adoptado y compatible con muchos proveedores (Google, Facebook, GitHub, etc.).

---

### Ejemplo de código con OAuth 2.0 y `google-api-nodejs-client`

```javascript
const { google } = require('googleapis');
const oauth2Client = new google.auth.OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'YOUR_REDIRECT_URL'
);

// Genera la URL de autorización
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline', // Para obtener un refresh token
  scope: ['https://www.googleapis.com/auth/drive.readonly'], // Permisos solicitados
});

console.log('Autoriza esta aplicación visitando esta URL:', authUrl);

// Después de que el usuario conceda permisos, intercambia el código por un token
const code = 'EL_CODIGO_DE_AUTORIZACION'; // Este código se obtiene después de la redirección
oauth2Client.getToken(code, (err, token) => {
  if (err) {
    console.error('Error al obtener el token:', err);
    return;
  }
  oauth2Client.setCredentials(token); // Configura el token en el cliente
  console.log('Token de acceso:', token.access_token);
});
```

---
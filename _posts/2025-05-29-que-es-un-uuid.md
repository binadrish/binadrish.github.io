---
layout: post
title: "¿Qué es un UUID?"
excerpt: "Descubre como utilizar uno de los identificadores más utilizados en la actualidad"
author: "Adrian Galvan R."
date: 2025-05-29
categories: [artículo, Bases de datos]
img: "https://images.unsplash.com/photo-1617704716344-8d987ac681a4?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
---

Un **UUID** (Universally Unique Identifier), también conocido como **GUID** (Globally Unique Identifier), es un identificador único de 128 bits que se usa para distinguir objetos o información en sistemas distribuidos sin necesidad de una autoridad central.
### ¿Cómo luce un UUID?

Un UUID típico se representa como una cadena de 36 caracteres en formato hexadecimal con guiones:

```
550e8400-e29b-41d4-a716-446655440000
```

Está dividido en cinco grupos de caracteres:  
8-4-4-4-12

---
### ¿Para qué sirve un UUID?

Se utiliza para:

- Identificar recursos en bases de datos (por ejemplo, IDs de usuarios).
    
- Evitar colisiones de identificadores en aplicaciones distribuidas.
    
- Crear claves únicas en sistemas que no dependen de autoincrementos.
    
- Identificar objetos en APIs, archivos, sesiones, etc.
    
---

### Tipos de UUID (más comunes):

1. **UUID v1** – Basado en el timestamp y dirección MAC del dispositivo (poco privado).
    
2. **UUID v4** – Totalmente aleatorio. Es el más común en la práctica.
    
3. **UUID v5** – Generado a partir de un _namespace_ y un nombre (hash SHA-1, determinista).

---

### ¿Cómo se generan?

#### En Node.js (UUID v4 con la librería `uuid`)

```bash
npm install uuid
```

```ts
import { v4 as uuidv4 } from 'uuid';

const id = uuidv4(); // Ejemplo: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
```

#### En Python

```python
import uuid

id = uuid.uuid4()
print(id)  # Ejemplo: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
```

#### En PostgreSQL

```sql
-- Activar extensión si es necesario
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Generar UUID v4
SELECT uuid_generate_v4();
```

---

### Ventajas

- Son únicos con altísima probabilidad.
    
- No requieren una base de datos para generar un nuevo ID.
    
- Útiles en sistemas distribuidos y microservicios.
    

### Desventajas

- Más largos que un entero auto-incremental.
    
- Difíciles de leer o recordar manualmente.
    
- No son necesariamente ordenados (salvo algunas variantes como UUID v1).
---
layout: post
title: "Integraciones con Gemini: Chat Inteligente desde el terminal en python"
excerpt: "Revisemos los criterios necesarios para crear un buen sistema de autenticación"
author: "Adrian Galvan R."
date: 2025-06-19
categories: [artículo, inteligencia artificial]
img: "https://images.unsplash.com/photo-1710993011904-8f1162b9806d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
---
**Gemini** es una familia de modelos de inteligencia artificial desarrollada por **Google DeepMind**, ampliamente utilizada en la actualidad. Se trata de modelos **multimodales**, lo que significa que pueden procesar y generar distintos tipos de contenido: texto, código, imágenes, audio y video.

Aunque su potencial va mucho más allá, en este artículo nos centraremos en dos herramientas clave que permiten **integrar Gemini en tus aplicaciones de forma gratuita**:

- **Gemini API**
- **Google GenAI SDK**

Ambas herramientas te permitirán experimentar con los modelos más avanzados de Google sin necesidad de infraestructura compleja.

### Gemini API

La **Gemini API** es una interfaz que permite a desarrolladores acceder a los modelos de lenguaje (LLM) de Google de forma programática. En esencia, la API actúa como un puente, permitiendo que tu software interactúe con estos modelos para realizar tareas como generar texto, traducir idiomas, responder preguntas y más.

### Google GenAI SDK

Google GenAI conjunto de bibliotecas que brindan una interfaz unificada para acceder a los modelos de IA generativos de Google a través de la API para desarrolladores de Gemini y Vertex AI. Actualmente está disponible para varios lenguajes: Python, JavaScript/TypeScript, GO, y Java.

El SDK de Google Gen AI es ahora la ruta recomendada para acceder a todos los modelos de Google y todos los fragmentos de código en nuestra documentación utilizan estas bibliotecas.

## Integración en Python paso a paso

### 1. Instalación

Primero, instala el paquete oficial usando `pip`:

```bash
pip install -q -U google-genai
```

> Asegúrate de tener una **clave API activa**, que puedes obtener desde el portal de Gemini: [ai.google.dev](https://ai.google.dev/)

---

### 2. Primer ejemplo: generar texto con un prompt

```python
from google import genai

client = genai.Client(api_key="YOUR_API_KEY")

response = client.models.generate_content(
    model="gemini-2.5-flash", 
    contents="Explain how AI works in a few words"
)

print(response.text)
```

Este código envía un mensaje al modelo y muestra su respuesta. Puedes cambiar el `prompt` para experimentar con otras instrucciones.

---

### 3. Chat en terminal con entrada dinámica

Puedes convertir este ejemplo en un **chat en tiempo real desde la terminal** simplemente usando un bucle:

```python
from google import genai

client = genai.Client(api_key="YOUR_API_KEY")

while True:
    prompt = input("You-> ")
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    print("GemiPy->", response.text)
```

---

### 4. Instrucciones del sistema y sesiones personalizadas

Puedes definir un **comportamiento personalizado del modelo** usando instrucciones del sistema. Para ello, importa los tipos necesarios:

```python
from google import genai
from google.genai import types

client = genai.Client(api_key="YOUR_API_KEY")

chat = client.chats.create(
    model="gemini-1.5-flash",
    config=types.GenerateContentConfig(
        system_instruction="You are a terminal AI agent for AdrianGR. Respond only with plain text."
    )
)

while True:
    message = input("You-> ")
    response = chat.send_message(message)
    print("GemiPy->", response.text)
```

---

### 5. Salida del chat con palabra clave

Puedes finalizar el chat detectando una palabra como `"False"` para romper el bucle:

```python
from google import genai
from google.genai import types

client = genai.Client(api_key="YOUR_API_KEY")

chat = client.chats.create(
    model="gemini-1.5-flash",
    config=types.GenerateContentConfig(
        system_instruction="You are a terminal AI agent for AdrianGR. Respond only with plain text."
    )
)

print("GemiPy-> Hello Adrian. How can I help you?")
print("You-> ", end="")

while True:
    message = input()
    if message == "False":
        break
    response = chat.send_message(message)
    print("\nGemiPy->", response.text)
    print("\nYou-> ", end="")
```

**Gemini API** y **Google GenAI SDK** representan una forma moderna, potente y gratuita de integrar modelos de lenguaje de última generación en tus proyectos. Ya sea para prototipar un chatbot, generar contenido o construir un asistente inteligente, estas herramientas están listas para usarse con pocas líneas de código.

Consulta la documentación oficial para más ejemplos y configuraciones avanzadas:
👉 [https://ai.google.dev/gemini-api/docs](https://ai.google.dev/gemini-api/docs)

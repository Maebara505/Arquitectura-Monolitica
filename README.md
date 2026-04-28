# 🏛️ Arquitecturas Monolíticas: Espagueti vs. Lasaña 🍝🧅

Este repositorio contiene dos proyectos desarrollados en **React + Vite** que consumen la PokéAPI. Su propósito principal es demostrar de forma práctica la diferencia entre un código monolítico sin estructura (Espagueti) y un código monolítico estructurado por responsabilidades (Lasaña en capas).

## 📁 Estructura del Repositorio

El proyecto está dividido en dos directorios principales:

1. `Pokemon-Espagueti/`: Implementación funcional pero desestructurada.
2. `Pokemon-Lasana/`: Implementación utilizando Arquitectura Limpia (Capas).

---

## 🍝 1. Código Espagueti (Monolítico Convencional)

En esta versión, todo el ecosistema de la aplicación vive en un único archivo (`App.jsx`).

* **Características:**
  * Mezcla el manejo de estado, las llamadas a la red (`fetch`), la lógica de filtrado de datos y el renderizado de la interfaz gráfica (HTML/JSX) en un solo lugar.
* **Problema:** * Aunque es rápido de escribir al principio, tiene un alto acoplamiento. Si la aplicación crece, el archivo se vuelve inmanejable, difícil de leer y muy propenso a errores al intentar modificar una sola parte.

---

## 🧅 2. Código Lasaña (Monolítico en Capas)

En esta versión, el sistema sigue siendo un monolito (se despliega todo junto), pero internamente está dividido en **capas lógicas**, donde cada archivo tiene una única responsabilidad.

* **Estructura de Capas:**
  * **Capa de Acceso a Datos (`services/`):** Se encarga exclusivamente de la comunicación con la PokéAPI y la limpieza de los datos crudos. No sabe de la existencia de React.
  * **Capa de Lógica de Negocio (`hooks/`):** Actúa como el "cerebro". Maneja los estados locales, solicita los datos al servicio y aplica las reglas de negocio (ej. filtrar la lista y limitar a 20 resultados). No sabe cómo se dibuja la interfaz.
  * **Capa de Presentación (`components/`):** Recibe los datos ya procesados y se encarga únicamente de renderizar la interfaz web (Tarjetas, Grillas, Modales). 

* **Ventajas:** * Código altamente escalable, reutilizable y fácil de mantener. Si la API cambia, solo se modifica la capa de Servicio sin afectar el resto del sistema.

---

## 🚀 Cómo ejecutar los proyectos localmente

Para probar cualquiera de las dos arquitecturas en tu máquina local, sigue estos pasos:

1. Clona este repositorio:
   ```bash
   git clone [https://github.com/TU-USUARIO/Arquitectura-Monolitica.git](https://github.com/TU-USUARIO/Arquitectura-Monolitica.git)

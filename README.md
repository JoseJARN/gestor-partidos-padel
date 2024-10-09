# Padel Match Tracker

Un proyecto para gestionar los partidos de pádel jugados por una persona, permitiendo agregar, modificar y eliminar información sobre los partidos. Además, proporciona estadísticas visuales sobre los partidos jugados, utilizando gráficas y permitiendo la exportación e importación de los datos en formato JSON.

## Características

- **Añadir partidos:** Se puede registrar un partido incluyendo:

  - Compañero con el que jugaste
  - Rivales contra los que jugaste
  - Resultado del partido (formato texto: "6-2 / 7-5" o "6-4 / 3-6 / 5-7", etc.)
  - Resultado (ganado o perdido)
  - Categoría del partido (1ª, 2ª, 3ª, 4ª, 5ª)
  - Tipo de partido (Amistoso, Liga, Torneo)
  - Club y ubicación del partido
  - Fecha del partido
  - Costo del partido

- **Listado de partidos:** Los partidos se muestran en una lista, permitiendo modificar o eliminar cada entrada. Si ganaste, el partido aparecerá con un fondo verde claro y una banda verde. Si perdiste, se mostrará en rojo claro con una banda roja.

- **Estadísticas:** Con la librería `Chart.js` se generan gráficos interactivos que muestran:

  - Porcentaje de partidos ganados (por semana, mes, año)
  - Número de partidos ganados, perdidos y totales en esos periodos
  - Dinero gastado en los partidos por semana, mes, año
  - Desglose de partidos por categoría, mostrando en qué categoría has jugado más

- **Persistencia de datos:** Los partidos se guardan en `LocalStorage`, por lo que no se perderán al cerrar el navegador. Sin embargo, si se borra el historial o se cambia de navegador/dispositivo, la información se perderá. Por eso, se incluye una opción para exportar los partidos en formato JSON y cargarlos nuevamente si es necesario.

## Funcionalidades adicionales

- **Descargar partidos:** Opción para descargar todos los partidos en formato JSON.
- **Cargar partidos:** Si no tienes partidos añadidos, se mostrará una opción para cargar partidos desde un archivo JSON.

## Tecnologías utilizadas

- **[Vite](https://vitejs.dev/)**: Herramienta de desarrollo rápida para proyectos web modernos.
- **[React](https://react.dev/)**: Librería para construir interfaces de usuario interactivas.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework de CSS para crear rápidamente interfaces modernas.
- **[Chart.js](https://www.chartjs.org/)**: Librería de JavaScript para crear gráficos interactivos y personalizables.
- **[Bolt.new](https://bolt.new/)**: Editor de código online con IA para agilizar el desarrollo.

## Cómo usar el proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JoseJARN/gestor-partidos-padel.git
   ```

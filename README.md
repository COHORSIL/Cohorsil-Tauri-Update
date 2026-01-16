# Tauri + React + Vite + Tailwind CSS

Una aplicación de escritorio moderna construida con las mejores tecnologías web.

## 🚀 Stack Tecnológico

- **[Tauri](https://tauri.app/)** - Framework para aplicaciones de escritorio
- **[React](https://react.dev/)** - Biblioteca de UI
- **[Vite](https://vite.dev/)** - Build tool ultrarrápido
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS utility-first

## 📋 Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior)
- **Rust** - [Instalar Rust](https://www.rust-lang.org/learn/get-started#installing-rust)
- Dependencias del sistema para Tauri: [Ver prerequisitos](https://tauri.app/start/prerequisites/)

## 🛠️ Instalación

1. Las dependencias ya están instaladas, pero si necesitas reinstalarlas:

```bash
npm install
```

## 💻 Desarrollo

Para ejecutar la aplicación en modo desarrollo:

```bash
npm run tauri dev
```

Esto iniciará:

- El servidor de desarrollo de Vite
- La aplicación de escritorio de Tauri

## 🏗️ Build

Para crear una build de producción:

```bash
npm run tauri build
```

Esto generará los instaladores para tu sistema operativo en `src-tauri/target/release/bundle/`.

## 📱 Desarrollo Móvil (Opcional)

### Android

```bash
npm run tauri android init
npm run tauri android dev
```

### iOS

```bash
npm run tauri ios init
npm run tauri ios dev
```

## 🎨 Características

- ✨ **Diseño Moderno**: UI con gradientes, glassmorphism y animaciones suaves
- 🎯 **Tailwind CSS**: Estilos utility-first para desarrollo rápido
- ⚡ **Vite**: Hot Module Replacement (HMR) ultrarrápido
- 🦀 **Tauri**: Aplicaciones de escritorio ligeras y seguras
- 🔥 **React**: Componentes reactivos y reutilizables

## 📁 Estructura del Proyecto

```
cohorsil-tauri/
├── src/                  # Código fuente de React
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos globales con Tailwind
├── src-tauri/           # Código Rust de Tauri
├── public/              # Archivos estáticos
├── index.html           # HTML principal
├── vite.config.js       # Configuración de Vite
├── tailwind.config.js   # Configuración de Tailwind
└── postcss.config.js    # Configuración de PostCSS
```

## 🎯 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo de Vite
- `npm run build` - Construye la aplicación web
- `npm run tauri dev` - Inicia la aplicación de escritorio en modo desarrollo
- `npm run tauri build` - Construye la aplicación de escritorio para producción

## 📚 Recursos

- [Documentación de Tauri](https://tauri.app/)
- [Documentación de React](https://react.dev/)
- [Documentación de Vite](https://vite.dev/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/)

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Siéntete libre de abrir issues o pull requests.

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

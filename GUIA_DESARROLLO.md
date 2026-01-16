# 🚀 Guía Rápida de Desarrollo

## Primeros Pasos

### 1. Instalar Rust (si aún no lo tienes)

**macOS/Linux:**

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**Windows:**
Descarga e instala desde: https://www.rust-lang.org/tools/install

### 2. Verificar instalación de Rust

```bash
rustc --version
cargo --version
```

### 3. Ejecutar la aplicación

```bash
npm run tauri dev
```

## 🎨 Trabajando con Tailwind CSS

### Clases Útiles

**Gradientes:**

```jsx
<div className="bg-gradient-to-r from-purple-500 to-pink-500">
  Contenido con gradiente
</div>
```

**Glassmorphism:**

```jsx
<div className="bg-white/10 backdrop-blur-lg border border-white/20">
  Efecto de vidrio
</div>
```

**Animaciones:**

```jsx
<div className="hover:scale-105 transition-transform duration-300">
  Elemento con hover
</div>
```

### Animaciones Personalizadas Disponibles

- `animate-spin-slow` - Rotación lenta (3s)
- `animate-fade-in` - Aparición suave

## 🔧 Comandos de Tauri

### Desarrollo

```bash
npm run tauri dev          # Modo desarrollo
npm run tauri dev --release # Modo desarrollo optimizado
```

### Build

```bash
npm run tauri build        # Build de producción
```

### Información del sistema

```bash
npm run tauri info         # Ver información del entorno
```

## 📱 Desarrollo Móvil

### Android

```bash
# Inicializar proyecto Android
npm run tauri android init

# Ejecutar en Android
npm run tauri android dev
```

### iOS (solo macOS)

```bash
# Inicializar proyecto iOS
npm run tauri ios init

# Ejecutar en iOS
npm run tauri ios dev
```

## 🎯 Estructura de Componentes

### Crear un nuevo componente

```jsx
// src/components/MiComponente.jsx
import React from "react";

const MiComponente = ({ prop1, prop2 }) => {
  return (
    <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
      <h2 className="text-white text-2xl font-bold">{prop1}</h2>
      <p className="text-gray-200">{prop2}</p>
    </div>
  );
};

export default MiComponente;
```

### Usar el componente

```jsx
// src/App.jsx
import MiComponente from "./components/MiComponente";

function App() {
  return (
    <div>
      <MiComponente prop1="Título" prop2="Descripción" />
    </div>
  );
}
```

## 🔌 Llamar funciones de Rust desde React

### En Rust (src-tauri/src/main.rs)

```rust
#[tauri::command]
fn mi_funcion(parametro: String) -> String {
    format!("Recibido: {}", parametro)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![mi_funcion])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### En React

```jsx
import { invoke } from "@tauri-apps/api/core";

async function llamarRust() {
  const resultado = await invoke("mi_funcion", {
    parametro: "Hola desde React",
  });
  console.log(resultado);
}
```

## 🐛 Debugging

### Ver logs de Rust

Los logs de Rust aparecerán en la terminal donde ejecutaste `npm run tauri dev`

### Ver logs de React

Abre las DevTools del navegador en la ventana de Tauri:

- **macOS:** `Cmd + Option + I`
- **Windows/Linux:** `Ctrl + Shift + I`

## 📦 Build de Producción

El comando `npm run tauri build` generará instaladores en:

```
src-tauri/target/release/bundle/
```

**Formatos según el OS:**

- **macOS:** `.dmg`, `.app`
- **Windows:** `.msi`, `.exe`
- **Linux:** `.deb`, `.AppImage`

## 🎨 Tips de Diseño con Tailwind

1. **Usa el sistema de colores:** `bg-purple-500`, `text-blue-600`
2. **Spacing consistente:** `p-4`, `m-8`, `gap-6`
3. **Responsive design:** `md:grid-cols-2`, `lg:text-4xl`
4. **Dark mode:** `dark:bg-gray-900`, `dark:text-white`
5. **Hover effects:** `hover:scale-105`, `hover:bg-blue-600`

## 🚀 Próximos Pasos

1. Explora los componentes en `src/components/`
2. Modifica `App.jsx` para personalizar tu aplicación
3. Agrega nuevas funciones de Rust en `src-tauri/src/main.rs`
4. Experimenta con Tailwind CSS para crear diseños únicos

## 📚 Recursos Adicionales

- [Tauri Guides](https://tauri.app/guides/)
- [React Docs](https://react.dev/learn)
- [Tailwind Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Vite Guide](https://vite.dev/guide/)

# 🔄 Sistema de Actualizaciones Automáticas

Esta guía explica cómo funciona el sistema de actualizaciones automáticas en tu aplicación Tauri.

## 📋 Configuración Actual

### Archivos modificados:

- ✅ `src-tauri/Cargo.toml` - Plugin de actualizaciones agregado
- ✅ `src-tauri/tauri.conf.json` - Configuración de endpoints
- ✅ `src/components/UpdateChecker.jsx` - Componente UI de actualizaciones
- ✅ `package.json` - Dependencia `@tauri-apps/plugin-updater`

## 🚀 Cómo Funciona

### 1. **Verificación de Actualizaciones**

La app verifica automáticamente si hay actualizaciones disponibles al iniciar.

### 2. **Notificación al Usuario**

Si hay una actualización, aparece un banner en la esquina inferior derecha.

### 3. **Descarga e Instalación**

El usuario puede:

- **Actualizar ahora**: Descarga e instala inmediatamente
- **Más tarde**: Pospone la actualización

### 4. **Reinicio Automático**

Después de instalar, la app se reinicia automáticamente con la nueva versión.

## 🌐 Configuración del Servidor

### Opción 1: GitHub Releases (✅ YA CONFIGURADO)

**Repositorio:** `COHORSIL/Cohorsil-Tauri-Update` (Privado)

**Endpoint configurado:**

```
https://github.com/COHORSIL/Cohorsil-Tauri-Update/releases/latest/download/latest.json
```

#### 🚀 Publicar Actualización (Método Automatizado):

```bash
# 1. Configurar token de GitHub (solo primera vez)
export GH_TOKEN=tu_token_completo_aqui

# 2. Publicar actualización
./scripts/publish-update.sh 0.2.0 "Descripción de los cambios"
```

**El script hace TODO automáticamente:**

- ✅ Actualiza versiones en `package.json`, `Cargo.toml` y `tauri.conf.json`
- ✅ Compila la aplicación
- ✅ Crea el release en GitHub
- ✅ Sube el instalador (.dmg, .msi, etc.)
- ✅ Sube el archivo `latest.json`

📖 **Ver guía completa:** `GUIA_PUBLICACION.md`

### Opción 2: Servidor Propio

1. **Crea un endpoint** que devuelva JSON con esta estructura:

   ```json
   {
     "version": "0.2.0",
     "notes": "Descripción de cambios",
     "pub_date": "2026-01-16T00:00:00Z",
     "platforms": {
       "darwin-aarch64": {
         "signature": "",
         "url": "https://tu-servidor.com/downloads/tauri-app_0.2.0_aarch64.dmg"
       }
     }
   }
   ```

2. **Actualiza `tauri.conf.json`**:
   ```json
   "endpoints": [
     "https://tu-servidor.com/api/updates/{{target}}/{{current_version}}"
   ]
   ```

### Opción 3: Servicios de Hosting

- **Vercel**: Sube `latest.json` a `/public/`
- **Netlify**: Sube a `/public/`
- **AWS S3**: Bucket público con `latest.json`
- **Firebase Hosting**: Hosting estático

## 🔐 Firmas de Seguridad (Opcional pero Recomendado)

### Generar claves de firma:

```bash
# Instalar tauri-cli globalmente
npm install -g @tauri-apps/cli

# Generar par de claves
tauri signer generate -w ~/.tauri/myapp.key
```

Esto genera:

- **Clave privada**: `~/.tauri/myapp.key` (¡NO COMPARTIR!)
- **Clave pública**: Se muestra en consola

### Configurar en `tauri.conf.json`:

```json
"updater": {
  "active": true,
  "endpoints": ["..."],
  "dialog": true,
  "pubkey": "TU_CLAVE_PUBLICA_AQUI"
}
```

### Firmar el build:

```bash
# Al hacer build, firma automáticamente
TAURI_SIGNING_PRIVATE_KEY="$(cat ~/.tauri/myapp.key)" npm run tauri build
```

## 📝 Uso en tu Aplicación

### Agregar el componente a App.jsx:

```jsx
import UpdateChecker from "./components/UpdateChecker";

function App() {
  return (
    <div>
      {/* Tu contenido */}

      {/* Verificador de actualizaciones */}
      <UpdateChecker />
    </div>
  );
}
```

### Verificación manual:

```jsx
import { check } from "@tauri-apps/plugin-updater";

async function checkUpdates() {
  const update = await check();
  if (update?.available) {
    console.log(`Nueva versión: ${update.version}`);
  }
}
```

## 🔄 Flujo de Actualización

```
1. Usuario abre la app
   ↓
2. App verifica endpoint de actualizaciones
   ↓
3. ¿Hay nueva versión?
   ├─ NO → Continúa normalmente
   └─ SÍ → Muestra notificación
       ↓
4. Usuario hace clic en "Actualizar ahora"
   ↓
5. Descarga el nuevo instalador
   ↓
6. Instala en segundo plano
   ↓
7. Reinicia la app automáticamente
   ↓
8. ¡App actualizada! 🎉
```

## 📊 Versionado Semántico

Usa **Semantic Versioning** (semver):

- **MAJOR** (1.0.0): Cambios incompatibles
- **MINOR** (0.1.0): Nueva funcionalidad compatible
- **PATCH** (0.0.1): Correcciones de bugs

### Actualizar versión:

1. **En `package.json`**:

   ```json
   "version": "0.2.0"
   ```

2. **En `src-tauri/Cargo.toml`**:

   ```toml
   version = "0.2.0"
   ```

3. **En `src-tauri/tauri.conf.json`**:
   ```json
   "version": "0.2.0"
   ```

## 🧪 Probar Actualizaciones

### En desarrollo:

1. Cambia la versión a `0.2.0`
2. Haz un build: `npm run tauri build`
3. Crea `latest.json` apuntando a la nueva versión
4. Súbelo a tu servidor
5. Abre la app v0.1.0
6. Debería detectar la actualización

## ⚙️ Configuración Avanzada

### Actualización silenciosa (sin diálogo):

```json
"updater": {
  "active": true,
  "endpoints": ["..."],
  "dialog": false,  // Sin diálogo de confirmación
  "pubkey": ""
}
```

### Múltiples endpoints (fallback):

```json
"endpoints": [
  "https://servidor-principal.com/updates.json",
  "https://servidor-backup.com/updates.json"
]
```

### Verificar cada X tiempo:

```jsx
useEffect(() => {
  // Verificar cada 30 minutos
  const interval = setInterval(checkForUpdates, 30 * 60 * 1000);
  return () => clearInterval(interval);
}, []);
```

## 🎯 Ejemplo Completo con GitHub Releases

### 1. Crear script de release:

```bash
# scripts/release.sh
#!/bin/bash

VERSION=$1

# Actualizar versiones
npm version $VERSION --no-git-tag-version

# Build
npm run tauri build

# Crear tag
git add .
git commit -m "Release v$VERSION"
git tag v$VERSION
git push origin main
git push origin v$VERSION
```

### 2. Uso:

```bash
chmod +x scripts/release.sh
./scripts/release.sh 0.2.0
```

### 3. En GitHub:

- Ve a "Releases" → "Create new release"
- Sube los archivos de `src-tauri/target/release/bundle/`
- Crea y sube `latest.json`

## 📚 Recursos

- [Documentación oficial de Tauri Updater](https://tauri.app/plugin/updater/)
- [Ejemplos de GitHub Releases](https://github.com/tauri-apps/tauri/releases)
- [Semantic Versioning](https://semver.org/)

## ⚠️ Notas Importantes

1. **macOS**: Los usuarios pueden necesitar permitir la app en "Configuración de Seguridad"
2. **Windows**: Requiere permisos de administrador para instalar
3. **Firmas**: Altamente recomendadas para producción
4. **Testing**: Siempre prueba las actualizaciones antes de publicar

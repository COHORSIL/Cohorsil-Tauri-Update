# 🚀 Guía de Publicación de Actualizaciones

Esta guía te muestra cómo publicar actualizaciones para tu aplicación Tauri.

## 📋 Requisitos Previos

1. **Token de GitHub** configurado como variable de entorno
2. **Permisos** en el repositorio `COHORSIL/Cohorsil-Tauri-Update`
3. **Build tools** instalados (Rust, Node.js, etc.)

---

## 🔑 Configurar Token de GitHub (Solo Primera Vez)

### 1. Crear el Token

1. Ve a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click en "Generate new token (classic)"
3. Nombre: `Cohorsil Tauri Updates`
4. Permisos necesarios:
   - ✅ `repo` (Full control of private repositories)
5. Click en "Generate token"
6. **Copia el token** (solo se muestra una vez)

### 2. Configurar el Token en tu Sistema

**Opción A: Temporal (solo para esta sesión)**

```bash
export GH_TOKEN=tu_token_completo_aqui
```

**Opción B: Permanente (recomendado)**

Agrega al final de tu archivo `~/.zshrc` o `~/.bash_profile`:

```bash
# GitHub Token para Cohorsil Tauri Updates
export GH_TOKEN=tu_token_completo_aqui
```

Luego recarga:

```bash
source ~/.zshrc
```

### 3. Verificar que está configurado

```bash
echo $GH_TOKEN
```

Debería mostrar tu token.

---

## 🎯 Publicar una Actualización

### Método 1: Script Automatizado (RECOMENDADO)

```bash
# Dar permisos de ejecución (solo primera vez)
chmod +x scripts/publish-update.sh

# Publicar actualización
./scripts/publish-update.sh 0.2.0 "Mejoras en la interfaz y corrección de bugs"
```

El script hace **TODO automáticamente**:

1. ✅ Actualiza versiones en `package.json`, `Cargo.toml` y `tauri.conf.json`
2. ✅ Compila la aplicación (`npm run tauri build`)
3. ✅ Genera el archivo `latest.json`
4. ✅ Crea commit y tag en Git
5. ✅ Crea el Release en GitHub
6. ✅ Sube el instalador (.dmg, .msi, etc.)
7. ✅ Sube el `latest.json`

### Método 2: Manual (Paso a Paso)

Si prefieres hacerlo manualmente:

#### 1. Actualizar Versiones

**`package.json`:**

```json
"version": "0.2.0"
```

**`src-tauri/Cargo.toml`:**

```toml
version = "0.2.0"
```

**`src-tauri/tauri.conf.json`:**

```json
"version": "0.2.0"
```

#### 2. Compilar

```bash
npm run tauri build
```

Los archivos se generan en `src-tauri/target/release/bundle/`

#### 3. Crear `latest.json`

```json
{
  "version": "0.2.0",
  "notes": "Descripción de los cambios",
  "pub_date": "2026-01-16T22:00:00Z",
  "platforms": {
    "darwin-aarch64": {
      "signature": "",
      "url": "https://github.com/COHORSIL/Cohorsil-Tauri-Update/releases/download/v0.2.0/tauri-app_0.2.0_aarch64.dmg"
    }
  }
}
```

#### 4. Crear Tag y Push

```bash
git add .
git commit -m "chore: bump version to v0.2.0"
git tag v0.2.0
git push origin main
git push origin v0.2.0
```

#### 5. Crear Release en GitHub

```bash
# Usando GitHub CLI
gh release create v0.2.0 \
  --repo COHORSIL/Cohorsil-Tauri-Update \
  --title "v0.2.0" \
  --notes "Descripción de cambios" \
  src-tauri/target/release/bundle/dmg/*.dmg \
  latest.json
```

O manualmente en: https://github.com/COHORSIL/Cohorsil-Tauri-Update/releases/new

---

## 🔄 Flujo Completo de Actualización

```
1. Desarrollador ejecuta: ./scripts/publish-update.sh 0.2.0
   ↓
2. Script compila y sube a GitHub Releases
   ↓
3. Usuario abre la app v0.1.0
   ↓
4. App consulta: github.com/COHORSIL/Cohorsil-Tauri-Update/releases/latest/download/latest.json
   ↓
5. Detecta nueva versión (0.2.0)
   ↓
6. Muestra banner de actualización
   ↓
7. Usuario hace clic en "Actualizar ahora"
   ↓
8. Descarga desde GitHub Releases
   ↓
9. Instala y reinicia
   ↓
10. ¡App actualizada! 🎉
```

---

## 📝 Ejemplos de Uso

### Actualización Menor (Bug Fixes)

```bash
./scripts/publish-update.sh 0.1.1 "Corrección de errores menores"
```

### Actualización con Nuevas Funcionalidades

```bash
./scripts/publish-update.sh 0.2.0 "Agregado modo oscuro y mejoras de rendimiento"
```

### Actualización Mayor

```bash
./scripts/publish-update.sh 1.0.0 "Primera versión estable - Rediseño completo de la interfaz"
```

---

## 🧪 Probar Actualizaciones

### En Desarrollo

1. Instala la versión actual (ej: 0.1.0)
2. Publica una nueva versión (ej: 0.2.0) usando el script
3. Abre la app v0.1.0
4. Debería detectar automáticamente la actualización

### Verificar Manualmente

```bash
# Ver el latest.json publicado
curl https://github.com/COHORSIL/Cohorsil-Tauri-Update/releases/latest/download/latest.json
```

---

## ⚠️ Solución de Problemas

### Error: "GH_TOKEN no está configurado"

```bash
export GH_TOKEN=tu_token_aqui
```

### Error: "Permission denied"

```bash
chmod +x scripts/publish-update.sh
```

### Error: "No se encontró el bundle"

Verifica que el build se completó:

```bash
ls -la src-tauri/target/release/bundle/
```

### La app no detecta actualizaciones

1. Verifica que el repositorio sea **público** o que el `latest.json` sea accesible
2. Revisa la consola de la app para ver errores
3. Verifica la URL en `src-tauri/tauri.conf.json`

---

## 🔐 Seguridad

### ⚠️ IMPORTANTE: Nunca compartas tu token

- ❌ No lo subas a Git
- ❌ No lo compartas en mensajes
- ❌ No lo incluyas en el código

### Buenas Prácticas

1. **Usa variables de entorno** para el token
2. **Agrega `.env` al `.gitignore`**
3. **Rota el token** periódicamente
4. **Revoca tokens** que no uses

---

## 📊 Versionado Semántico

Sigue el formato `MAJOR.MINOR.PATCH`:

- **MAJOR** (1.0.0): Cambios incompatibles con versiones anteriores
- **MINOR** (0.1.0): Nueva funcionalidad compatible
- **PATCH** (0.0.1): Corrección de bugs

### Ejemplos:

- `0.1.0` → `0.1.1`: Bug fix
- `0.1.1` → `0.2.0`: Nueva característica
- `0.9.0` → `1.0.0`: Primera versión estable

---

## 📚 Recursos

- [Documentación Tauri Updater](https://tauri.app/plugin/updater/)
- [GitHub API - Releases](https://docs.github.com/en/rest/releases)
- [Semantic Versioning](https://semver.org/)

---

## 🎯 Checklist de Publicación

Antes de publicar, verifica:

- [ ] Token de GitHub configurado (`echo $GH_TOKEN`)
- [ ] Cambios commiteados en Git
- [ ] Versión actualizada en los 3 archivos
- [ ] Build funciona correctamente
- [ ] Notas de la versión preparadas
- [ ] Script tiene permisos de ejecución

Luego ejecuta:

```bash
./scripts/publish-update.sh X.Y.Z "Descripción de cambios"
```

¡Y listo! 🚀

# 🚀 Sistema de Actualizaciones - Resumen Rápido

## ✅ Configuración Actual

- **Repositorio de actualizaciones:** `COHORSIL/Cohorsil-Tauri-Update` (público)
- **Endpoint:** `https://github.com/COHORSIL/Cohorsil-Tauri-Update/releases/latest/download/latest.json`
- **Estado:** ✅ Configurado y listo para usar
- **Plataformas soportadas:** macOS (Intel + Apple Silicon), Windows, Linux

---

## 📦 Publicar una Actualización

### Opción 1: GitHub Actions (RECOMENDADO - Multi-Plataforma Automático) ⚡

Compila automáticamente para **macOS, Windows y Linux**:

```bash
# 1. Actualizar versiones manualmente
# Edita: package.json, src-tauri/Cargo.toml, src-tauri/tauri.conf.json

# 2. Commit y crear tag
git add .
git commit -m "chore: bump version to v0.2.0"
git tag v0.2.0
git push origin main
git push origin v0.2.0
```

**GitHub Actions se encarga del resto:**

- ✅ Compila para macOS (Intel y Apple Silicon)
- ✅ Compila para Windows
- ✅ Compila para Linux
- ✅ Crea el release automáticamente
- ✅ Sube todos los instaladores
- ✅ Genera y sube `latest.json` con todas las plataformas

### Opción 2: Script Local (Solo tu Plataforma Actual) 🔧

Compila solo para tu sistema operativo actual (macOS en tu caso):

```bash
./scripts/publish-update.sh 0.2.0 "Descripción de cambios"
```

**Limitación:** Solo genera instalador para macOS.

---

## 🔑 Configurar GitHub CLI (Solo Primera Vez)

```bash
# Instalar
brew install gh

# Autenticarse
gh auth login

# Verificar
gh auth status
```

---

## 🔄 Cómo Funciona

```
Usuario abre app v0.1.0
    ↓
App consulta GitHub Releases
    ↓
Detecta nueva versión (0.2.0)
    ↓
Muestra notificación
    ↓
Usuario actualiza
    ↓
Descarga el instalador correcto para su plataforma
    ↓
¡Listo! 🎉
```

---

## 🖥️ Compilación Multi-Plataforma

### ¿Puedo compilar para Windows desde macOS?

**No directamente**, pero tienes opciones:

1. **GitHub Actions** (recomendado): Compila automáticamente en la nube para todas las plataformas
2. **Máquina virtual**: Usa Windows en VM para compilar manualmente
3. **Dual boot**: Arranca en Windows para compilar
4. **Otra computadora**: Usa una PC con Windows

**GitHub Actions es la mejor opción** porque:

- ✅ Es gratis
- ✅ Automático
- ✅ Compila para todas las plataformas
- ✅ No necesitas otras máquinas

---

## 📚 Documentación Completa

- **Guía rápida:** `README_ACTUALIZACIONES.md`
- **Guía completa:** `GUIA_PUBLICACION.md`
- **Documentación técnica:** `ACTUALIZACIONES.md`

---

## 🆘 Ayuda Rápida

### Ver si GitHub CLI está configurado

```bash
gh auth status
```

### Dar permisos al script

```bash
chmod +x scripts/publish-update.sh
```

### Ver releases publicados

```bash
open https://github.com/COHORSIL/Cohorsil-Tauri-Update/releases
```

### Probar endpoint de actualizaciones

```bash
curl https://github.com/COHORSIL/Cohorsil-Tauri-Update/releases/latest/download/latest.json
```

---

**¿Dudas?** Revisa `GUIA_PUBLICACION.md` para más detalles.

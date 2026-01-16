# 🚀 Sistema de Actualizaciones - Resumen Rápido

## ✅ Configuración Actual

- **Repositorio de actualizaciones:** `COHORSIL/Cohorsil-Tauri-Update` (privado)
- **Endpoint:** `https://github.com/COHORSIL/Cohorsil-Tauri-Update/releases/latest/download/latest.json`
- **Estado:** ✅ Configurado y listo para usar

---

## 📦 Publicar una Actualización

### Opción 1: Automatizado (RECOMENDADO) ⚡

```bash
# 1. Configurar token (solo primera vez)
export GH_TOKEN=tu_token_de_github

# 2. Publicar
./scripts/publish-update.sh 0.2.0 "Descripción de cambios"
```

### Opción 2: Manual 🔧

Ver guía completa en: **`GUIA_PUBLICACION.md`**

---

## 🔑 Configurar Token de GitHub (Primera Vez)

1. Ve a: https://github.com/settings/tokens
2. Genera un token con permisos `repo`
3. Configúralo:

```bash
# Temporal (solo esta sesión)
export GH_TOKEN=tu_token_aqui

# Permanente (recomendado)
echo 'export GH_TOKEN=tu_token_aqui' >> ~/.zshrc
source ~/.zshrc
```

---

## 📚 Documentación Completa

- **`GUIA_PUBLICACION.md`** - Guía paso a paso para publicar actualizaciones
- **`ACTUALIZACIONES.md`** - Documentación técnica del sistema
- **`scripts/publish-update.sh`** - Script automatizado

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
¡Listo! 🎉
```

---

## ⚠️ Importante

- **Nunca subas tu token a Git** (ya está en `.gitignore`)
- **Usa versionado semántico:** `MAJOR.MINOR.PATCH`
- **Prueba antes de publicar**

---

## 🆘 Ayuda Rápida

### Ver si el token está configurado

```bash
echo $GH_TOKEN
```

### Dar permisos al script

```bash
chmod +x scripts/publish-update.sh
```

### Ver releases publicados

```bash
open https://github.com/COHORSIL/Cohorsil-Tauri-Update/releases
```

---

**¿Dudas?** Revisa `GUIA_PUBLICACION.md` para más detalles.

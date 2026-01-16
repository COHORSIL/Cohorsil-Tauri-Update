# 🚀 Sistema de Actualizaciones - Resumen Rápido

## ✅ Configuración Actual

- **Repositorio de actualizaciones:** `COHORSIL/Cohorsil-Tauri-Update` (público)
- **Endpoint:** `https://github.com/COHORSIL/Cohorsil-Tauri-Update/releases/latest/download/latest.json`
- **Estado:** ✅ Configurado y listo para usar
- **Plataformas soportadas:** macOS (Intel + Apple Silicon), Windows, Linux

---

## 📦 Publicar una Actualización

### Método Principal: Script Local 🔧

Este método compila la aplicación en tu máquina actual y la sube a GitHub.

```bash
# Publicar nueva versión
./scripts/publish-update.sh 0.2.0 "Descripción de cambios"
```

El script automáticamente:

1. Actualiza versiones
2. Compila la App
3. Genera `latest.json`
4. Sube todo a GitHub Releases

**Nota:** Solo generará el instalador para tu sistema operativo actual (macOS).

---

## 🔑 Configurar GitHub CLI (Necesario)

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

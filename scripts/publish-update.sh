#!/bin/bash

# Script para publicar actualizaciones de Cohorsil Tauri App
# Uso: ./scripts/publish-update.sh 0.2.0 "Descripción de los cambios"

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar argumentos
if [ -z "$1" ]; then
    echo -e "${RED}Error: Debes especificar la versión${NC}"
    echo "Uso: ./scripts/publish-update.sh 0.2.0 \"Descripción de cambios\""
    exit 1
fi

VERSION=$1
NOTES=${2:-"Nueva actualización disponible"}
REPO="COHORSIL/Cohorsil-Tauri-Update"

# Verificar que gh CLI está instalado
if ! command -v gh &> /dev/null; then
    echo -e "${RED}Error: GitHub CLI (gh) no está instalado${NC}"
    echo "Instálalo con: brew install gh"
    echo "Luego autentícate con: gh auth login"
    exit 1
fi

echo -e "${GREEN}🚀 Publicando actualización v${VERSION}${NC}"
echo ""

# 1. Actualizar versiones en los archivos
echo -e "${YELLOW}📝 Actualizando versiones...${NC}"

# package.json
sed -i '' "s/\"version\": \".*\"/\"version\": \"${VERSION}\"/" package.json

# Cargo.toml
sed -i '' "s/^version = \".*\"/version = \"${VERSION}\"/" src-tauri/Cargo.toml

# tauri.conf.json
sed -i '' "s/\"version\": \".*\"/\"version\": \"${VERSION}\"/" src-tauri/tauri.conf.json

echo -e "${GREEN}✓ Versiones actualizadas${NC}"

# 2. Hacer build de producción
echo -e "${YELLOW}🔨 Compilando aplicación...${NC}"
npm run tauri build

echo -e "${GREEN}✓ Build completado${NC}"

# 3. Crear latest.json
echo -e "${YELLOW}📄 Generando latest.json...${NC}"

# Detectar la plataforma actual
PLATFORM=$(uname -m)
OS=$(uname -s)

if [ "$OS" = "Darwin" ]; then
    if [ "$PLATFORM" = "arm64" ]; then
        TARGET="darwin-aarch64"
        BUNDLE_EXT="dmg"
        ARCH="aarch64"
    else
        TARGET="darwin-x86_64"
        BUNDLE_EXT="dmg"
        ARCH="x64"
    fi
elif [ "$OS" = "Linux" ]; then
    TARGET="linux-x86_64"
    BUNDLE_EXT="AppImage"
    ARCH="amd64"
else
    TARGET="windows-x86_64"
    BUNDLE_EXT="msi"
    ARCH="x64"
fi

# Buscar el archivo del bundle
BUNDLE_DIR="src-tauri/target/release/bundle"
BUNDLE_FILE=$(find "$BUNDLE_DIR" -name "*${VERSION}*${ARCH}*.${BUNDLE_EXT}" | head -n 1)

if [ -z "$BUNDLE_FILE" ]; then
    echo -e "${RED}Error: No se encontró el archivo del bundle${NC}"
    echo "Buscando en: $BUNDLE_DIR"
    exit 1
fi

BUNDLE_NAME=$(basename "$BUNDLE_FILE")

cat > latest.json << EOF
{
  "version": "${VERSION}",
  "notes": "${NOTES}",
  "pub_date": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "platforms": {
    "${TARGET}": {
      "signature": "",
      "url": "https://github.com/${REPO}/releases/download/v${VERSION}/${BUNDLE_NAME}"
    }
  }
}
EOF

echo -e "${GREEN}✓ latest.json creado${NC}"

# 4. Commit y push
echo -e "${YELLOW}📤 Creando commit y tag...${NC}"

git add package.json src-tauri/Cargo.toml src-tauri/tauri.conf.json
git commit -m "chore: bump version to v${VERSION}" || true
git tag "v${VERSION}"
git push origin main || git push origin master
git push origin "v${VERSION}"

echo -e "${GREEN}✓ Cambios subidos a Git${NC}"

# 5. Crear release en GitHub usando gh CLI
echo -e "${YELLOW}🎉 Creando GitHub Release...${NC}"

gh release create "v${VERSION}" \
  --repo "${REPO}" \
  --title "v${VERSION}" \
  --notes "${NOTES}" \
  "${BUNDLE_FILE}" \
  latest.json

echo -e "${GREEN}✓ Release creado y archivos subidos${NC}"

# 6. Limpiar
rm latest.json

echo ""
echo -e "${GREEN}✅ ¡Actualización v${VERSION} publicada exitosamente!${NC}"
echo ""
echo "🔗 URL del release: https://github.com/${REPO}/releases/tag/v${VERSION}"
echo "📥 Los usuarios recibirán la actualización automáticamente"
echo ""

#!/bin/bash

# Script SIMPLIFICADO para disparar GitHub Actions
# Uso: ./scripts/publish-update.sh 0.2.0 "Descripción"

set -e

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

if [ -z "$1" ]; then
    echo "❌ Error: Especifica la versión. Ej: ./scripts/publish-update.sh 0.1.6 \"Notas\""
    exit 1
fi
VERSION=$1
NOTES=${2:-"Actualización"}

echo -e "${GREEN}🚀 Preparando lanzamiento v${VERSION} para GitHub Actions${NC}"

# 1. Actualizar versiones
echo -e "${YELLOW}📝 Actualizando archivos de versión...${NC}"
sed -i '' "s/\"version\": \".*\"/\"version\": \"${VERSION}\"/" package.json
sed -i '' "s/^version = \".*\"/version = \"${VERSION}\"/" src-tauri/Cargo.toml
sed -i '' "s/\"version\": \".*\"/\"version\": \"${VERSION}\"/" src-tauri/tauri.conf.json

# 2. Git
echo -e "${YELLOW}📤 Subiendo a GitHub...${NC}"
git add package.json src-tauri/Cargo.toml src-tauri/tauri.conf.json
git commit -m "chore: release v${VERSION}"
git tag "v${VERSION}"
git push origin main
git push origin "v${VERSION}"

echo ""
echo -e "${GREEN}✅ ¡Lanzamiento iniciado!${NC}"
echo -e "Ahora ve a GitHub Actions para ver el progreso:"
echo -e "🔗 https://github.com/COHORSIL/Cohorsil-Tauri-Update/actions"
echo ""
echo -e "GitHub compilará para WINDOWS y MAC automáticamente."

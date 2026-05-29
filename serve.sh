#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Serve o manual localmente SEM instalar Ruby/Jekyll na máquina.
# Usa a imagem oficial `ruby` via Docker; os gems ficam num volume nomeado
# para que reexecuções sejam rápidas.
#
#   ./serve.sh          → http://localhost:4000
#   ./serve.sh build    → gera o site estático em ./_site
# ---------------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")"

RUBY_IMAGE="ruby:3.3"
BUNDLE_VOLUME="clinikify_manual_bundle"
CMD="${1:-serve}"

if [[ "$CMD" == "build" ]]; then
  RUN="bundle install && bundle exec jekyll build"
else
  RUN="bundle install && bundle exec jekyll serve --host 0.0.0.0 --port 4000 --force_polling --livereload"
fi

exec docker run --rm -it \
  -v "$PWD":/site -w /site \
  -v "$BUNDLE_VOLUME":/usr/local/bundle \
  -p 4000:4000 -p 35729:35729 \
  "$RUBY_IMAGE" \
  bash -lc "$RUN"

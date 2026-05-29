# Manual do Usuário · Clinikify

Site Jekyll (tema **Just the Docs**) com o manual de uso do Clinikify para
clínicas e consultórios — em **pt-BR**, voltado ao usuário final.

## Servir localmente

Não é preciso instalar Ruby/Jekyll: o `serve.sh` roda tudo via Docker.

```bash
./serve.sh            # http://localhost:4000  (com livereload)
./serve.sh build      # gera o site estático em ./_site
```

> A primeira execução baixa os gems (alguns minutos). As seguintes usam o
> volume `clinikify_manual_bundle` e são rápidas.

## Estrutura

```
_config.yml              configuração do site + tema
index.md                 página inicial
primeiros-passos/        visão geral, perfis, cadastro, login
agenda/                  agenda
pacientes/               pacientes + prontuário (PEP), odontograma, planos
retornos/                retornos
faturamento/             faturamento + repasses
profissional/            áreas do profissional (repasses, certificado, docs)
configuracoes/           perfil, marca, serviços, modelos, membros, etc.
_includes/figura.html    componente de print com legenda (e placeholder)
_sass/custom/custom.scss estilos próprios
assets/images/<seção>/   prints das telas
scripts/                 automação de prints (Playwright)
```

## Prints das telas (Playwright)

Os prints são capturados automaticamente do app de demonstração. Veja
[`scripts/README.md`](scripts/README.md) para o passo a passo (subir a stack
do Clinikify, semear a clínica demo e rodar o capturador).

As imagens são salvas em `assets/images/<seção>/<nome>.png`, exatamente os
caminhos referenciados nas páginas via `{% raw %}{% include figura.html %}{% endraw %}`.
Enquanto um print não existe, a página mostra um placeholder "Print pendente".

# justfile

install:
    bun install

build:
    bun build

serve:
    bun run dev

deploy:
    bun run build && bun run serve

format:
    bun run format

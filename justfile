# justfile

install:
    bun install

build:
    bun build

serve:
    bun run dev

deploy:
    bun run build && bun run dev

format:
    bun run format

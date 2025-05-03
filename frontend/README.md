# blog APP Jakkrit

# create .env
```
- create .env file ใช้คำสั่งตามด้านล่าง
   $ copy .env.example .env

- ใส่ endpoint api
  NUXT_PUBLIC_API_BASE_URL=              (eg. http://localhost:8000/api)
```

## Install Package
Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server
Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev   (for dev)

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

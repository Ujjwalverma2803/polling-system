# Polling System (Next.js)

A realtime polling/voting web application built with Next.js, React and Socket.IO.

## Overview

This repository contains a frontend implementation of a realtime polling system using the Next.js App Router and TypeScript. Users can create polls and vote in realtime — updates are delivered via Socket.IO.

## Features

- Create and participate in polls
- Realtime vote updates using Socket.IO
- Built with Next.js (App Router) and TypeScript
- Tailwind CSS for styling

## Tech stack

- Next.js
- React
- TypeScript
- Socket.IO (client)
- Tailwind CSS
- PostCSS / Autoprefixer

## Requirements

- Node.js (recommended: latest LTS)
- npm (or yarn/pnpm)

## Getting started

1. Clone the repository

```bash
git clone https://github.com/Ujjwalverma2803/polling-system.git
cd polling-system
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
# open http://localhost:3000
```

4. Build and start for production

```bash
npm run build
npm start
```

## Environment variables

This project includes a `.env` file locally. Typical variables you may need (examples):

```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_SERVER_URL=http://localhost:4000
```

Adjust names and values to match your backend/socket server configuration. Do not commit secrets to the repository.

## Available scripts (from package.json)

- `dev` — next dev
- `build` — next build
- `start` — next start
- `lint` — next lint

## Project structure (high-level)

- app/ — Next.js app routes (App Router)
- components/ — UI components
- lib/ — utility functions and helpers
- public/ — static assets
- src/ — source code
- types/ — TypeScript type definitions

Note: Adjust these descriptions if your local layout differs.

## Tailwind / PostCSS

Project includes Tailwind CSS and PostCSS configuration files. See `tailwind.config.js` and `postcss.config.js` for details.

## Notes

- This project depends on Next.js ^15 and React ^19 as listed in package.json.
- The repository contains build artifacts such as `.next/` and `out/` directories. Typically these are ignored in source control.

## Contributing

Contributions are welcome. Please open an issue to discuss major changes before submitting a pull request.

## License

Add a license file (e.g., MIT) if you want to make the project open-source.

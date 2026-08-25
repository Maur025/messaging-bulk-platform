# kernotec-notification-console

Web console for composing and launching WhatsApp bulk broadcast messages. The user writes a message, selects a delivery channel (loaded from the backend), adds recipients (phone numbers), and sends the message to the backend send queue.

## Features

- Compose a broadcast message with a chat-style live preview that updates as you type.
- Load available delivery channels from the backend (`GET /channels`).
- Add recipients manually with a country code prefix (for example +591 for Bolivia, +1).
- Persist the recipient list in `sessionStorage` (key `recipients`) for the current session.
- Enqueue the message for delivery through the backend send queue (`POST /whatsapp/queue`).

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- shadcn/ui (Base UI)
- Zustand
- lucide-react
- Package manager: pnpm

## Getting Started

### Requirements

- Node.js 18 or later
- pnpm

### Install

```bash
pnpm install
```

### Environment variables

| Variable        | Description                                        | Default                 |
| --------------- | -------------------------------------------------- | ----------------------- |
| `VITE_API_URL`  | Base URL of the backend API the UI consumes.       | `http://localhost:3000` |

The `.env.example` file sets `VITE_API_URL` to `http://localhost:8801` (the backend runs on port 8801).

### Run the dev server

```bash
pnpm dev
```

## API endpoints consumed

The console consumes the following endpoints against `VITE_API_URL`.

| Method | Path               | Description                                                        | Response / body                                             |
| ------ | ------------------ | ------------------------------------------------------------------ | ----------------------------------------------------------- |
| GET    | `/channels`        | Lists the available delivery channels.                             | `{ data: [{ name, referenceId }] }`                          |
| POST   | `/whatsapp/queue`  | Enqueues a broadcast message for delivery.                         | Body: `{ channelIds: string[], message: string, type: "TEXT", toList: string[] }` |

`toList` holds phone numbers including their country code.

## Branch strategy

| Branch   | Purpose                                  |
| -------- | ---------------------------------------- |
| `main`   | Production                               |
| `staging`| Pre-production                           |
| `sandbox`| Testing                                  |
| `develop`| Integration                              |

## Scripts

| Command        | Description                       |
| -------------- | --------------------------------- |
| `pnpm dev`     | Start the Vite dev server.        |
| `pnpm build`   | Type-check and build (`tsc -b && vite build`). |
| `pnpm lint`    | Lint the codebase with oxlint.    |
| `pnpm preview` | Preview the production build.     |

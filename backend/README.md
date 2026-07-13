# KubeShort URL Service

KubeShort URL Service is the backend for the KubeShort project. It provides a simple URL shortening API built with Node.js, Express, TypeScript, PostgreSQL, Prisma ORM, and nanoid.

## Project Description

The service accepts a valid URL, generates a unique short code, stores it in PostgreSQL through Prisma, and redirects users from the short code back to the original destination. Click counts are incremented whenever a short link is visited, and responses are returned as JSON except for the redirect endpoint.

## Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- nanoid

## Folder Structure

```text
backend/url-service/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
├── prisma/
├── package.json
├── tsconfig.json
├── Dockerfile
├── .env.example
├── .gitignore
└── README.md
```

## Installation

```bash
npm install
npm run prisma:generate
```

## Environment Variables

Copy `.env.example` to `.env` and set the values for your environment.

- `PORT` - HTTP server port
- `DATABASE_URL` - PostgreSQL connection string used by Prisma
- `BASE_URL` - Public base URL used when building shortened links in responses. The service appends `/r/<shortCode>` automatically.
- `SHORT_CODE_LENGTH` - Length of generated short codes

## Running Locally

```bash
npm run dev
```

## Build

```bash
npm run build
npm start
```

## API Endpoints

- `GET /health`
- `POST /api/v1/urls`
- `GET /:shortCode`
- `GET /api/v1/urls/:shortCode`
- `DELETE /api/v1/urls/:shortCode`

## Docker

Build the image with:

```bash
docker build -t kubeshort-url-service .
```

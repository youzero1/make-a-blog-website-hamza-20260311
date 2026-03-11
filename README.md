# Blog App

A full-stack blog application built with Next.js 14, TypeScript, TypeORM, and SQLite.

## Features

- 📝 Create, read, update, and delete blog posts
- 🔍 Search posts by title or author
- 🖼️ Featured image support (via URL)
- 📱 Fully responsive design
- 🗄️ SQLite database with TypeORM
- 🐳 Docker-ready with multi-stage builds

## Tech Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, CSS Modules
- **Backend**: Next.js API Routes
- **Database**: SQLite via TypeORM and better-sqlite3
- **Deployment**: Docker / Coolify

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Local Development

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd blog-app
   ```

2. Install dependencies:
   ```bash
   npm i
   ```

3. Set up environment variables (`.env` already included):
   ```env
   DATABASE_PATH=./data/blog.sqlite
   NEXT_PUBLIC_APP_TITLE=My Blog
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
docker-compose up -d
```

This will:
- Build the Docker image
- Start the container on port 3000
- Mount a persistent volume for the SQLite database

### Using Docker directly

```bash
docker build -t blog-app .
docker run -p 3000:3000 -v blog-data:/app/data blog-app
```

## Coolify Deployment

1. Connect your repository to Coolify
2. Set the build pack to "Docker Compose"
3. Configure environment variables:
   - `DATABASE_PATH=/app/data/blog.sqlite`
   - `NEXT_PUBLIC_APP_TITLE=My Blog`
4. Deploy!

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts (supports `?search=` query) |
| POST | `/api/posts` | Create a new post |
| GET | `/api/posts/:id` | Get a single post |
| PUT | `/api/posts/:id` | Update a post |
| DELETE | `/api/posts/:id` | Delete a post |

### Create/Update Post Body

```json
{
  "title": "string (required)",
  "content": "string (required)",
  "author": "string (required)",
  "excerpt": "string (optional)",
  "featuredImage": "string (optional, URL)"
}
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Header/Footer
│   ├── page.tsx            # Home page
│   ├── posts/
│   │   ├── page.tsx        # Posts listing with search
│   │   ├── new/page.tsx    # Create new post
│   │   └── [id]/
│   │       ├── page.tsx    # View single post
│   │       └── edit/page.tsx # Edit post
│   └── api/posts/          # API routes
├── components/             # Reusable React components
├── entities/               # TypeORM entities
├── lib/                    # Database connection
└── types/                  # TypeScript type definitions
```

## License

MIT

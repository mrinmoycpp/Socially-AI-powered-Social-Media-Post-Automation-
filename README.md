# Social Media Automation Server

AI-powered social media post automation backend server.

## Features

- User authentication (register/login)
- Social media account integration via Zernio
- Account synchronization
- JWT-based authentication

## Tech Stack

- Node.js with TypeScript
- Express.js
- MongoDB with Mongoose
- Zernio SDK for social media integration

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ZERNIO_API_KEY=your_zernio_api_key
ZERNIO_REDIRECT_URI=your_redirect_uri
```

3. Start the server:
```bash
npm run server
```

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/social/:platform/url` - Generate OAuth URL
- `GET /api/social/:platform/sync` - Sync connected accounts

# Crowntunz Music - Streaming Platform

A modern, full-featured music streaming platform for independent artists to share unlimited music and connect directly with fans.

## 🎵 Features

### Artist Features
- **Upload Music**: Artists can upload unlimited songs with metadata
- **Manage Library**: Organize songs, playlists, and collections
- **Analytics**: Track plays, likes, and listener engagement
- **Monetization**: Direct support from fans and revenue sharing

### Fan Features
- **Discover Music**: Browse songs by genre, artist, and trending
- **Create Playlists**: Curate custom playlists
- **Social**: Follow artists, share music, and connect with community
- **High-Quality Audio**: Stream in multiple bitrates

### Platform Features
- **User Authentication**: Secure login/registration with JWT
- **Search**: Full-text search for songs and artists
- **Social Features**: Follow, like, and share functionality
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with React 18
- **Styling**: CSS-in-JS with styled-components
- **State Management**: Zustand
- **Audio Player**: WaveSurfer.js
- **Icons**: React Icons

### Backend
- **Server**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Real-time**: Socket.io
- **File Upload**: Multer (local) or AWS S3

### DevOps
- **Package Manager**: npm
- **Task Runner**: Concurrently
- **Linting**: ESLint with Next.js
- **Testing**: Jest

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm 8+
- PostgreSQL 12+ (optional for development)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/websitehuck/streaming-app.git
cd streaming-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. **Start the development server**
```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Songs
- `GET /api/songs` - Get all songs
- `GET /api/songs/:id` - Get song details
- `POST /api/songs/upload` - Upload new song (protected)

### Playlists
- `GET /api/playlists` - Get user playlists (protected)
- `POST /api/playlists` - Create playlist (protected)
- `POST /api/playlists/:playlistId/songs/:songId` - Add song to playlist (protected)

### Search
- `GET /api/search?q=query` - Search songs and artists

### Users
- `GET /api/users/:id` - Get user profile

## 📁 Project Structure

```
streaming-app/
├── crowntunzmusic.com/     # Static HTML entry point
├── pages/                  # Next.js pages
├── components/             # React components
├── public/                 # Static assets
├── server/                 # Express backend
├── package.json            # Dependencies
├── next.config.js          # Next.js configuration
└── .env.example            # Environment template
```

## 🔧 Available Scripts

- `npm run dev` - Start development servers (frontend + backend)
- `npm run dev:client` - Start Next.js dev server only
- `npm run dev:server` - Start Express server only
- `npm run build` - Build production bundle
- `npm start` - Run production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests with Jest

## 🔐 Authentication

The platform uses JWT (JSON Web Tokens) for authentication:

1. User registers or logs in
2. Server returns JWT token
3. Client stores token in localStorage
4. Token included in `Authorization: Bearer <token>` header for protected routes
5. Server verifies token before processing request

## 💾 Database Schema

### Users
```sql
- id (uuid, primary key)
- email (string, unique)
- username (string)
- password (hash)
- profile_picture_url (string)
- bio (text)
- created_at (timestamp)
- updated_at (timestamp)
```

### Songs
```sql
- id (uuid, primary key)
- user_id (foreign key → users)
- title (string)
- artist (string)
- duration (integer)
- file_url (string)
- cover_art_url (string)
- genre (string)
- plays (integer)
- likes (integer)
- created_at (timestamp)
```

### Playlists
```sql
- id (uuid, primary key)
- user_id (foreign key → users)
- name (string)
- description (text)
- is_public (boolean)
- created_at (timestamp)
```

### Playlist_Songs
```sql
- playlist_id (foreign key → playlists)
- song_id (foreign key → songs)
- position (integer)
```

## 🚢 Deployment

### Prepare for Production
1. Set `NODE_ENV=production`
2. Configure database connection
3. Set secure JWT_SECRET
4. Configure S3 or file storage
5. Set up email/SMTP
6. Configure payment processor (optional)

### Deploy to Vercel (Frontend)
```bash
vercel deploy
```

### Deploy Backend to Heroku/Railway
```bash
# Configure environment variables
# Push to platform
```

## 📝 Environment Variables

See `.env.example` for all available options including:
- Database credentials
- JWT secret
- AWS S3 configuration
- SMTP for emails
- Stripe for payments
- OAuth credentials

## 🐛 Troubleshooting

**Issue**: Connection refused on port 3001
- Solution: Ensure backend server is running (`npm run dev:server`)

**Issue**: Port already in use
- Solution: Change PORT in `.env.local` or kill existing process

**Issue**: Database connection error
- Solution: Verify DATABASE_URL in `.env.local` and PostgreSQL is running

## 📊 Project Status

| Component | Status | Notes |
|-----------|--------|-------|
| Frontend HTML | ✅ Complete | Optimized landing page |
| Backend API | ✅ Core ready | Mock database, ready for PostgreSQL |
| Authentication | ✅ Implemented | JWT-based with bcrypt |
| Music Upload | ⏳ Ready for DB | API endpoints defined |
| Search | ✅ Implemented | Basic filtering |
| Playlists | ✅ Implemented | CRUD operations |
| Real-time Features | ⏳ Planned | Socket.io configured |
| Payments | ⏳ Planned | Stripe integration ready |
| Analytics | ⏳ Planned | Framework in place |

## 🗺️ Roadmap

### Phase 1: MVP (Current)
- ✅ User authentication
- ✅ Basic music upload
- ✅ Search functionality
- ✅ Playlist management

### Phase 2: Enhancement
- [ ] PostgreSQL database integration
- [ ] AWS S3 file storage
- [ ] Real-time notifications
- [ ] Social features (follow, like)
- [ ] User profiles

### Phase 3: Monetization
- [ ] Payment processing
- [ ] Artist analytics
- [ ] Revenue distribution
- [ ] Premium features

### Phase 4: Scale
- [ ] Mobile app
- [ ] Artist dashboard
- [ ] Recommendation engine
- [ ] AI-powered playlists

## 📄 License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/websitehuck/streaming-app/issues)
- Email: support@crowntunzmusic.com

## 👥 Team

- **Project Lead**: websitehuck
- **Platform**: Crowntunz Music

---

**Made with ❤️ for independent artists worldwide**

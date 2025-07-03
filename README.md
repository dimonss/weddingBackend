# Wedding Guest Management API

## 📌 Description
A modern Node.js API for managing wedding guest invitations. This application provides endpoints for guests to view their invitation details and respond with acceptance or rejection.

## 🚀 Features
- RESTful API for guest management
- Guest lookup by UUID
- RSVP functionality (accept/reject)
- Pagination for guest list retrieval
- Comprehensive error handling
- Input validation

## 🛠️ Technology Stack
- **Node.js** with **Express.js** - Backend framework
- **Sequelize ORM** - Database operations
- **SQLite** - Database storage
- **dotenv** - Environment configuration

## 💻 Installation and Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v7 or higher)

### 1. Clone the repository:
```sh
git clone https://github.com/dimonss/wedding_backend.git
cd wedding_backend
```

### 2. Install dependencies:
```sh
npm install
```

### 3. Set up environment variables:
Create a `.env` file in the project root with:
```
HOSTNAME=localhost
PORT=4000
NODE_ENV=development
```

### 4. Run migrations to set up the database:
```sh
node initDB.js
```

### 5. Start the server:
```sh
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

The server will start at `http://localhost:4000` (or the port specified in your .env file).

## 📡 API Endpoints

### Health Check
- **GET** `/health` - Check if the API is running

### Guest Information
- **GET** `/guest/:uuid` - Get a specific guest by UUID
- **GET** `/guests` - Get all guests with pagination
  - Query parameters: `page` (default: 1), `limit` (default: 10)

### RSVP Management
- **POST** `/guest_accept/:uuid` - Accept an invitation
- **POST** `/guest_reject/:uuid` - Reject an invitation

## 📦 Project Structure
```
/wedding_backend
│── /src                    # Source code
│   │── /db                 # Database related files
│   │   │── /models         # Data models
│   │   │   └── guest.js    # Guest model
│   │   │── sequelize.js    # Database connection
│   │   └── guestService.js # Guest service layer
│   │── /DTO               # Data Transfer Objects
│   │   └── common.js      # Response DTO
│   │── /utils             # Utility functions
│   │   └── commonUtils.js # Common utilities
│   │── constants.js       # Application constants
│   └── index.js           # Application entry point
│── initDB.js          # Database migrations
│── .env                   # Environment variables
│── package.json           # Project dependencies
└── README.md             # Project documentation
```

## 🚀 Development

### Run in development mode with hot-reload:
```sh
npm run start:dev
```

### Linting
```sh
npm run lint
```

### Formatting
```sh
npm run format
```

## 📝 License
MIT

---
Author: Chalysh Dmitrii

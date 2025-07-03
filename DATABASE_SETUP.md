# Database Setup Guide

This guide explains how to set up and use the database system with environment-based configuration.

## Database Configuration

The application now supports two different databases based on the environment:

### Development Environment (Default)
- **Database File**: `test_db.sqlite`
- **Purpose**: Local development and testing
- **Mock Data**: Available for testing

### Production Environment
- **Database File**: `db.sqlite`
- **Purpose**: Production deployment
- **Mock Data**: Not available

## Environment Variables

Set the `NODE_ENV` environment variable to control which database is used:

```bash
# For development (uses test_db.sqlite)
NODE_ENV=development

# For production (uses db.sqlite)
NODE_ENV=production
```

## Setup Commands

### Development Setup

1. **Initialize database** (creates tables and structure):
   ```bash
   npm run init-db
   ```

2. **Add mock users** (populates test database with sample users):
   ```bash
   npm run addMockUsers
   ```

3. **Add mock guests** (populates test database with sample guests):
   ```bash
   npm run addMockGuests
   ```

4. **Complete development setup** (runs all three commands above):
   ```bash
   npm run setup-dev
   ```

### Production Setup

1. **Initialize database** (creates production database structure):
   ```bash
   npm run init-db
   ```

## Running the Application

### Development Mode
```bash
npm run start:dev
```
- Uses `test_db.sqlite`
- Includes mock data
- Verbose logging enabled

### Production Mode
```bash
npm run start:prod
```
- Uses `db.sqlite`
- No mock data
- Optimized for production

## Database Files

### test_db.sqlite
- **Location**: `weddingBackend/test_db.sqlite`
- **Purpose**: Development and testing
- **Content**: Mock users and guests
- **Safe to delete**: Can be recreated with setup commands

### db.sqlite
- **Location**: `weddingBackend/db.sqlite`
- **Purpose**: Production data
- **Content**: Real user and guest data
- **Important**: Contains production data, do not delete

## Mock Data Scripts

The following scripts are specifically designed for the test database:

### addMockUsers.js
- **Database**: Always uses `test_db.sqlite`
- **Purpose**: Populates test database with 10 sample wedding couples
- **Command**: `npm run addMockUsers`

### addMockGuests.js
- **Database**: Always uses `test_db.sqlite`
- **Purpose**: Populates test database with 7-10 guests per user
- **Command**: `npm run addMockGuests`

## Migration Scripts

### initDB.js
- **Database**: Uses environment-based selection
- **Purpose**: Creates database structure
- **Command**: `npm run init-db`

## Configuration Files

### src/config/database.js
- **Purpose**: Centralized database configuration
- **Features**:
  - Environment-based database selection
  - Verbose mode configuration
  - Utility functions for database operations

## Development Workflow

1. **Start development**:
   ```bash
   npm run setup-dev
   npm run start:dev
   ```

2. **Reset test data** (if needed):
   ```bash
   rm test_db.sqlite
   npm run setup-dev
   ```

3. **Test with mock data**:
   - Use the provided mock users and guests
   - All mock data is in `test_db.sqlite`

## Production Workflow

1. **Set production environment**:
   ```bash
   export NODE_ENV=production
   ```

2. **Initialize database**:
   ```bash
   npm run init-db
   ```

3. **Start production server**:
   ```bash
   npm run start:prod
   ```

## Troubleshooting

### Database File Not Found
If you get a "database file not found" error:

1. **For development**: Run `npm run setup-dev`
2. **For production**: Run `npm run init-db`

### Wrong Database Being Used
Check your `NODE_ENV` environment variable:

```bash
echo $NODE_ENV
```

- If empty or `development`: Uses `test_db.sqlite`
- If `production`: Uses `db.sqlite`

### Mock Data Not Available
Mock data is only available in the test database (`test_db.sqlite`). Make sure you're running in development mode.

## File Structure

```
weddingBackend/
├── db.sqlite              # Production database
├── test_db.sqlite         # Test database (created by setup)
├── src/
│   ├── config/
│   │   └── database.js    # Database configuration
│   └── db/
│       ├── userSQL.js     # User database operations
│       └── guestSQL.js    # Guest database operations
├── addMockUsers.js        # Mock user data script
├── addMockGuests.js       # Mock guest data script
├── initDB.js              # Database initialization
└── package.json           # NPM scripts
```

## Notes

- The test database (`test_db.sqlite`) is safe to delete and recreate
- The production database (`db.sqlite`) contains real data and should be backed up
- Mock data scripts only work with the test database
- Environment variables control which database is used
- All database operations automatically use the correct database based on environment 
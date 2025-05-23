# Wedding Backend Development Guide

## Commands
- `npm run start:dev` - Start development server with nodemon
- `npm run start:prod` - Start production server with PM2
- `npm run build` - Clean build directory and compile
- `npm run start` - Build and run application
- `npm run lint` - Run ESLint
- `npm run format` - Run ESLint with auto-fix
- API tests: `node test_api_endpoints.js`

## Code Style
- **Imports**: ES modules with named/default exports
- **Formatting**: Single quotes, semicolons, 4-space indentation, 120 char limit
- **Types**: JSDoc annotations for type definitions
- **Naming**: 
  - UPPERCASE for constants
  - PascalCase for classes
  - camelCase for functions, variables, parameters
- **Error Handling**: Callbacks for DB operations, try/catch for server
- **Architecture**: 
  - DTO objects for standardized responses
  - SQL operations in dedicated files
  - Utility functions and constants separated

## Rules
- Always create SQL queries in guestSQL.js, not in service files
- Use the DTO classes for all API responses
- Add meaningful comments for complex business logic
- Use async/await pattern for database operations
- Follow MVC pattern with controllers, services, and data layers
- Keep functions small and focused on a single responsibility

Always run `npm run lint` and `npm run format` before committing changes.
# Arogya Saathi Backend

## Development
1. Install dependencies: \
pm install\
2. Start development server: \
pm run dev\
3. The server will run on http://localhost:3000

## Production Deployment

### Option 1: Using PM2
1. Build the application: \
pm run build\
2. Start production server: \
pm run start:prod\
3. Stop production server: \
pm run stop:prod\

### Option 2: Using Docker
1. Build and start: \docker-compose -f docker-compose.production.yml up -d\
2. Stop: \docker-compose -f docker-compose.production.yml down\

### Environment Variables
- Create a \.env.production\ file with your production variables
- Required variables:
  - NODE_ENV=production
  - PORT=3000
  - DATABASE_URL=file:./prod.db
  - JWT_SECRET=your_very_secure_jwt_secret

## API Documentation
The API endpoints are documented in the API_DOCS.md file.

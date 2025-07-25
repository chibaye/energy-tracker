# Energy Usage Tracker API

A CRUD API for managing customer energy usage records built with Express.js and PostgreSQL.

## Features

- Add new usage record (customer ID, kWh used, timestamp)
- List all records
- Get specific record by ID
- Update existing records
- Delete records

## Tech Stack

- **Backend**: Express.js
- **Database**: PostgreSQL
- **Language**: JavaScript (ES Modules)

## Setup

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database credentials:
```
DB_DSN=postgres://localhost:5432/greenpower
```

3. Create the PostgreSQL database:
```sql
CREATE DATABASE energy_tracker;
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Health Check
- `GET /` - API health check

### Usage Records
- `GET /api/usage` - Get all usage records
- `GET /api/usage/:id` - Get specific usage record
- `POST /api/usage` - Create new usage record
- `PUT /api/usage/:id` - Update usage record
- `DELETE /api/usage/:id` - Delete usage record

## Request/Response Examples

### Create Usage Record
```bash
POST /api/usage
Content-Type: application/json

{
  "customer_id": 12345,
  "kwh_used": 150.75,
  "timestamp": "2025-01-25T10:30:00Z"  // optional, defaults to current time
}
```

### Update Usage Record
```bash
PUT /api/usage/1
Content-Type: application/json

{
  "customer_id": 54321,
  "kwh_used": 200.50,
  "timestamp": "2025-01-25T14:45:00Z"
}
```

## Database Schema

The `usage_records` table has the following structure:

```sql
CREATE TABLE usage_records (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  kwh_used DECIMAL(10,2) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Testing with Postman

Import the `postman_collection.json` file into Postman to test all API endpoints. The collection includes:

- Pre-configured requests for all CRUD operations
- Environment variables with UPPERCASE naming convention
- Sample data for testing

### Postman Variables

The collection uses these variables (all UPPERCASE):
- `BASE_URL`: API base URL (default: http://localhost:3000)
- `RECORD_ID`: ID for specific record operations
- `CUSTOMER_ID`: Customer ID for creating records
- `KWH_USED`: Energy usage amount
- `TIMESTAMP`: Timestamp for usage records

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (missing required fields)
- `404` - Not Found
- `500` - Internal Server Error
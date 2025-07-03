# Database Schema Documentation

This document describes the database schema for the Wedding Invitation System.

## Database: `db.sqlite`

The application uses SQLite as the database engine with a single database file located at `db.sqlite`.

## Tables

### 1. User Table

The `user` table stores information about wedding couples who use the system.

#### Schema

```sql
CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    auth TEXT NOT NULL,
    husbands_name TEXT DEFAULT '',
    wifes_name TEXT DEFAULT '',
    address TEXT DEFAULT '',
    date TEXT DEFAULT '',
    time TEXT DEFAULT ''
);
```

#### Columns

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique identifier for the user |
| `phone` | TEXT | NOT NULL, UNIQUE | User's phone number (Ukrainian format: +380...) |
| `username` | TEXT | NOT NULL, UNIQUE | Unique username for login |
| `auth` | TEXT | NOT NULL | Base64 encoded authentication credentials (username:password) |
| `husbands_name` | TEXT | DEFAULT '' | Husband's full name |
| `wifes_name` | TEXT | DEFAULT '' | Wife's full name |
| `address` | TEXT | DEFAULT '' | Wedding venue address |
| `date` | TEXT | DEFAULT '' | Wedding date (YYYY-MM-DD format) |
| `time` | TEXT | DEFAULT '' | Wedding time (HH:MM format) |

#### Sample Data

```javascript
{
    id: 1,
    phone: '+380991234567',
    username: 'john_doe',
    auth: 'am9objpkb2UxMjM=', // base64 encoded "john:doe123"
    husbands_name: 'John Doe',
    wifes_name: 'Jane Smith',
    address: 'Kyiv, Ukraine - Beautiful Wedding Venue',
    date: '2024-06-15',
    time: '15:00'
}
```

### 2. Guest Table

The `guest` table stores information about wedding guests invited by users.

#### Schema

```sql
CREATE TABLE guest (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT NOT NULL UNIQUE,
    fullName TEXT NOT NULL UNIQUE,
    respDate TEXT,
    respStatus INTEGER DEFAULT NULL,
    gender TEXT NOT NULL DEFAULT 'male',
    user_id INTEGER
);
```

#### Columns

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique identifier for the guest |
| `uuid` | TEXT | NOT NULL, UNIQUE | Unique UUID for guest identification |
| `fullName` | TEXT | NOT NULL, UNIQUE | Guest's full name |
| `respDate` | TEXT | NULL | Date when guest responded to invitation |
| `respStatus` | INTEGER | DEFAULT NULL | Response status: NULL (pending), 1 (accepted), 0 (declined) |
| `gender` | TEXT | NOT NULL, DEFAULT 'male' | Guest's gender: 'male' or 'female' |
| `user_id` | INTEGER | NULL | Foreign key reference to user.id |

#### Response Status Values

- `NULL` - Pending (guest hasn't responded yet)
- `1` - Accepted (guest accepted the invitation)
- `0` - Declined (guest declined the invitation)

#### Sample Data

```javascript
{
    id: 1,
    uuid: '550e8400-e29b-41d4-a716-446655440000',
    fullName: 'Michael Johnson',
    respDate: '2024-05-20',
    respStatus: 1, // Accepted
    gender: 'male',
    user_id: 1
}
```

## Relationships

### Foreign Key Relationships

- `guest.user_id` → `user.id`
  - Each guest belongs to one user (wedding couple)
  - One user can have multiple guests
  - Relationship: One-to-Many

## Indexes

### Primary Keys
- `user.id` - Auto-incrementing primary key
- `guest.id` - Auto-incrementing primary key

### Unique Constraints
- `user.phone` - Ensures unique phone numbers
- `user.username` - Ensures unique usernames
- `guest.uuid` - Ensures unique guest identifiers
- `guest.fullName` - Ensures unique guest names

## Data Types and Formats

### Phone Numbers
- Format: Ukrainian international format
- Example: `+380991234567`

### Dates
- Format: ISO 8601 (YYYY-MM-DD)
- Example: `2024-06-15`

### Times
- Format: 24-hour (HH:MM)
- Example: `15:00`

### Authentication
- Format: Base64 encoded string
- Content: `username:password`
- Example: `am9objpkb2UxMjM=` (decodes to "john:doe123")

### UUIDs
- Format: Standard UUID v4
- Example: `550e8400-e29b-41d4-a716-446655440000`

## Migration History

The database schema has evolved through several migrations:

1. **Initial user table** - Basic user information (id, phone, username, auth)
2. **user_v1** - Added husbands_name column
3. **user_v2** - Added wifes_name column
4. **user_v3** - Added address column
5. **user_v4** - Added date column
6. **user_v5** - Added time column
7. **Initial guest table** - Basic guest information (id, uuid, fullName, respDate, respStatus, gender)
8. **guest_v1** - Added user_id foreign key column

## Usage Examples

### Creating a User
```javascript
const user = {
    phone: '+380991234567',
    username: 'john_doe',
    auth: Buffer.from('john:doe123').toString('base64'),
    husbands_name: 'John Doe',
    wifes_name: 'Jane Smith',
    address: 'Kyiv, Ukraine',
    date: '2024-06-15',
    time: '15:00'
};
```

### Creating a Guest
```javascript
const guest = {
    uuid: uuidv4(),
    fullName: 'Michael Johnson',
    gender: 'male',
    user_id: 1
};
```

### Querying Related Data
```sql
-- Get all guests for a specific user with couple information
SELECT g.*, u.husbands_name, u.wifes_name, u.date, u.time, u.address 
FROM guest g 
LEFT JOIN user u ON g.user_id = u.id 
WHERE g.user_id = 1;
```

## Notes

- All text fields use UTF-8 encoding
- Dates and times are stored as text for simplicity
- The `respStatus` field uses integers for better performance in queries
- UUIDs are generated using the `uuid` npm package
- Authentication credentials are base64 encoded for storage 
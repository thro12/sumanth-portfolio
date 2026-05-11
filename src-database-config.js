// src/config/database.js
// PostgreSQL Database Connection Configuration

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'hospital_command_center',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test connection
pool.on('connect', () => {
  console.log('✓ Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('✗ Unexpected error on idle client', err);
});

// Query logging for development
pool.on('query', (query) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Query:', query.text.substring(0, 100) + '...');
  }
});

module.exports = pool;

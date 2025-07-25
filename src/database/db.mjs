import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: "postgres://localhost:5432/greenpower",
});

export default pool;
import express from 'express';
import pool from '../database/db.mjs';

const router = express.Router();

// GET /api/usage - List all usage records
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM usage_records ORDER BY timestamp DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching usage records:', error);
    res.status(500).json({ error: 'Failed to fetch usage records' });
  }
});

// GET /api/usage/:id - Get specific usage record
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM usage_records WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usage record not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching usage record:', error);
    res.status(500).json({ error: 'Failed to fetch usage record' });
  }
});

// POST /api/usage - Create new usage record
router.post('/', async (req, res) => {
  try {
    const { customer_id, kwh_used, timestamp } = req.body;
    
    if (!customer_id || !kwh_used) {
      return res.status(400).json({ 
        error: 'customer_id and kwh_used are required' 
      });
    }
    
    const result = await pool.query(
      `INSERT INTO usage_records (customer_id, kwh_used, timestamp) 
       VALUES ($1, $2, $3) RETURNING *`,
      [customer_id, kwh_used, timestamp || new Date()]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating usage record:', error);
    res.status(500).json({ error: 'Failed to create usage record' });
  }
});

// PUT /api/usage/:id - Update usage record
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { customer_id, kwh_used, timestamp } = req.body;
    
    const result = await pool.query(
      `UPDATE usage_records 
       SET customer_id = COALESCE($1, customer_id),
           kwh_used = COALESCE($2, kwh_used),
           timestamp = COALESCE($3, timestamp),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $4 RETURNING *`,
      [customer_id, kwh_used, timestamp, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usage record not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating usage record:', error);
    res.status(500).json({ error: 'Failed to update usage record' });
  }
});

// DELETE /api/usage/:id - Delete usage record
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM usage_records WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usage record not found' });
    }
    
    res.json({ message: 'Usage record deleted successfully' });
  } catch (error) {
    console.error('Error deleting usage record:', error);
    res.status(500).json({ error: 'Failed to delete usage record' });
  }
});

export default router;
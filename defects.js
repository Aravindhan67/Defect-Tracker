const express = require('express');
const db = require('../database');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ CREATE: Add a new defect
router.post('/', authenticate, (req, res) => {
    const { title, description, status, assignedTo } = req.body;
    db.run(`INSERT INTO defects (title, description, status, assignedTo) VALUES (?, ?, ?, ?)`,
        [title, description, status, assignedTo], (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Defect added successfully' });
    });
});

// ✅ READ: Get all defects
router.get('/', authenticate, (req, res) => {
    db.all(`SELECT * FROM defects`, [], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
});

// ✅ UPDATE: Edit a defect
router.put('/:id', authenticate, (req, res) => {
    const { title, description, status, assignedTo } = req.body;
    const { id } = req.params;
    db.run(`UPDATE defects SET title = ?, description = ?, status = ?, assignedTo = ? WHERE id = ?`,
        [title, description, status, assignedTo, id], (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Defect updated successfully' });
    });
});

// ✅ DELETE: Remove a defect
router.delete('/:id', authenticate, (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM defects WHERE id = ?`, [id], (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Defect deleted successfully' });
    });
});

module.exports = router;

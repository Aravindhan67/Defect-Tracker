const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const defectRoutes = require('./routes/defects');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/defects', defectRoutes);

// ✅ Default route to confirm the server is running
app.get('/', (req, res) => {
    res.send('Defect Tracker API is running on localhost 🚀');
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});

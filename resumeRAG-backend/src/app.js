require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//ROUTES
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date()
    });
})

//START SERVER
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
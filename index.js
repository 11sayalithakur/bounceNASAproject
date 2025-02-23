const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Validate environment variables
if (!process.env.NASA_API_KEY) {
    console.error('NASA_API_KEY is missing in the environment variables.');
    process.exit(1); // Exit if the API key is not provided
}

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', // Allow requests from your frontend or all origins
    methods: ['GET'], // Allow only GET requests
}));
app.use(express.json());

// Logging middleware (optional but recommended)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the NASA Data Explorer Backend!',
        endpoints: {
            apod: '/apod',
            marsRoverPhotos: '/mars-rover-photos?earth_date=YYYY-MM-DD',
        },
    });
});

// Astronomy Picture of the Day (APOD) endpoint
app.get('/apod', async (req, res) => {
    try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching APOD data:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
});

// Mars Rover Photos endpoint
app.get('/mars-rover-photos', async (req, res) => {
    const { earth_date } = req.query;

    // Validate earth_date parameter
    if (!earth_date || !/^\d{4}-\d{2}-\d{2}$/.test(earth_date)) {
        return res.status(400).json({ error: 'Invalid or missing earth_date parameter. Use format YYYY-MM-DD.' });
    }

    try {
        const response = await axios.get(
            `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earth_date}&api_key=${process.env.NASA_API_KEY}`
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching Mars Rover photos:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
});

// 404 Handler for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({ error: 'Something went wrong on the server!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
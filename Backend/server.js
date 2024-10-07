require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Password = require('./models/Password');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:5173', // Allow only your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err)); // More meaningful error logging

app.get('/', (req, res) => {
    res.send('Password Manager Backend is running');
});

app.post('/api/passwords', async (req, res) => {
    try {
        const newPassword = new Password(req.body);
        const savedPassword = await newPassword.save();
        res.status(201).json(savedPassword);
    } catch (err) {
        console.error('Error saving password:', err); // Log the error
        res.status(400).json({ message: err.message });
    }
});

app.get('/api/passwords', async (req, res) => {
    try {
        const passwords = await Password.find();
        res.status(200).json(passwords);
    } catch (err) {
        console.error('Error fetching passwords:', err); // Log the error
        res.status(500).json({ message: err.message });
    }
});

app.delete('/api/passwords/:id', async (req, res) => {
    try {
        await Password.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Password deleted' });
    } catch (err) {
        console.error('Error deleting password:', err); // Log the error
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/passwords/:id', async (req, res) => {
    try {
        const updatedPassword = await Password.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPassword);
    } catch (err) {
        console.error('Error updating password:', err); // Log the error
        res.status(400).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

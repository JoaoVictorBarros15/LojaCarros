// Import necessary modules
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const db = require('./db-lojacarros');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fs = require('fs');

// Load environment variables
dotenv.config();
const secretKey = process.env.SECRET_KEY;

// Ensure 'uploads' directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // No token, unauthorized

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token, forbidden
        req.user = user; // Attach user info to request object
        next();
    });
};

// Set up Express app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Validate image file types
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Tipo de arquivo não permitido'), false);
        }
        cb(null, true);
    }
});

// Routes and Endpoints
app.get('/carros', (req, res) => {
    db.all('SELECT * FROM Carros', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ carros: rows });
    });
});

app.get('/validate-token', authenticateToken, (req, res) => {
    res.json({ message: 'Token válido' });
});

app.post('/carros', upload.single('image'), (req, res) => {
    console.log('Request Body:', req.body);
    console.log('File:', req.file); // Exibe as informações sobre o arquivo
    const { nome, marca, ano, price, cor } = req.body;
    const imagePath = req.file ? req.file.path : null;

    if (!nome || !marca || !ano || !price || !cor || !imagePath) {
        console.log("Campos faltando:", { nome, marca, ano, price, cor, imagePath });
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    db.run(`
        INSERT INTO Carros (nome, marca, ano, price, cor, image)
        VALUES (?, ?, ?, ?, ?, ?)
    `, [nome, marca, ano, price, cor, imagePath], function (err) {
        if (err) {
            console.error("Erro ao inserir no banco:", err);
            return res.status(400).json({ error: err.message });
        }
        res.json({
            id: this.lastID,
            nome,
            marca,
            ano,
            price,
            cor,
            image: imagePath
        });
    });
});

app.put('/carros/:id', (req, res) => {
    const { id } = req.params;
    const { nome, marca, ano, price, cor } = req.body;

    // Validate input
    if (!nome || !marca || !ano || !price || !cor) {
        res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        return;
    }

    db.run(
        'UPDATE Carros SET nome = ?, marca = ?, ano = ?, price = ?, cor = ? WHERE id = ?',
        [nome, marca, ano, price, cor, id],
        function (err) {
            if (err) {
                console.error(`Erro ao atualizar carro com ID ${id}:`, err);
                res.status(400).json({ error: err.message });
                return;
            }
            if (this.changes === 0) {
                res.status(404).json({ message: 'Carro não encontrado' });
                return;
            }
            res.json({ message: `Carro atualizado com sucesso com ID ${id}` });
        }
    );
});

// User authentication and management endpoints (with token validation)
app.get('/users', authenticateToken, (req, res) => {
    db.all('SELECT id, username, email, created_at FROM Users', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ users: rows });
    });
});

// User registration and login endpoints...
// Include code for handling user registration, login, and updating user information here.

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

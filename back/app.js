// Import necessary modules
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const db = require('./db-loja');
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
// Car-related endpoints (no authentication needed for these)
app.get('/cars', (req, res) => {
    db.all('SELECT * FROM Carros', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ cars: rows });
    });
});

app.post('/cars', upload.single('image'), (req, res) => {
    const { modelo, ano, cor, preco } = req.body;
    const imagePath = req.file ? req.file.path : null;
    if (!modelo || !ano || !cor || !preco || !imagePath) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.run(
        'INSERT INTO Carros (modelo, ano, cor, preco, image) VALUES (?, ?, ?, ?, ?)',
        [modelo, ano, cor, preco, imagePath],
        function (err) {
            if (err) return res.status(400).json({ error: err.message });
            res.json({
                id: this.lastID,
                modelo,
                ano,
                cor,
                preco,
                image: imagePath
            });
        }
    );
});

// Endpoint para atualizar um carro existente
app.put('/cars/:id', (req, res) => {
    const { id } = req.params; // Extract ID from URL parameters
    const { modelo, ano, cor, preco } = req.body; // Extract body data

    // Validate input
    if (!modelo || !ano || !cor || !preco) {
        res.status(400).json({ message: 'All fields (modelo, ano, cor, preco) are required' });
        return;
    }

    db.run(
        'UPDATE Carros SET modelo = ?, ano = ?, cor = ?, preco = ? WHERE id = ?',
        [modelo, ano, cor, preco, id],
        function (err) {
            if (err) {
                console.error(`Error updating car with ID ${id}:`, err);
                res.status(400).json({ error: err.message });
                return;
            }
            if (this.changes === 0) {
                res.status(404).json({ message: 'Car not found' });
                return;
            }
            res.json({ message: `Car updated with ID ${id}` });
        }
    );
   // Endpoint para excluir um carro existente
app.delete('/cars/:id', (req, res) => {
    const { id } = req.params; // Pega o ID do carro

    // Lógica para deletar o carro com o id fornecido
    db.run('DELETE FROM Carros WHERE id = ?', [id], function (err) {
        if (err) {
            console.error(`Erro ao excluir o carro com ID ${id}:`, err);
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Carro não encontrado' });
        }
        res.status(200).send({ message: 'Carro excluído com sucesso' });
    });
});
});

// User endpoints with authentication
app.get('/users', authenticateToken, (req, res) => {
    db.all('SELECT id, username, email, created_at FROM Users', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ users: rows });
    });
});

app.post('/users', async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(
            'INSERT INTO Users (username, password, email) VALUES (?, ?, ?)',
            [username, hashedPassword, email],
            function (err) {
                if (err) return res.status(400).json({ error: err.message });
                res.json({ message: 'User registered successfully', id: this.lastID });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to update user
app.put('/users/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    // Only update provided fields
    let updateFields = [];
    let updateValues = [];

    if (username) {
        updateFields.push("username = ?");
        updateValues.push(username);
    }
    if (email) {
        updateFields.push("email = ?");
        updateValues.push(email);
    }
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateFields.push("password = ?");
        updateValues.push(hashedPassword);
    }
    updateValues.push(id);

    if (updateFields.length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
    }

    const query = `UPDATE Users SET ${updateFields.join(", ")} WHERE id = ?`;

    db.run(query, updateValues, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User updated successfully' });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.get('SELECT * FROM Users WHERE username = ?', [username], async (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    });
});

app.get('/profile', authenticateToken, (req, res) => {
    const { id } = req.user;
    db.get('SELECT id, username, email, created_at FROM Users WHERE id = ?', [id], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ user });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

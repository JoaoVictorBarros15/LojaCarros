const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/petshop.db');

const createInitialUser = async () => {
    const username = 'admin';
    const email = 'admin@example.com';
    const password = '1234';
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.run(
        'INSERT INTO Users (username, password, email) VALUES (?, ?, ?)',
        [username, hashedPassword, email],
        function(err) {
            if (err) {
                console.error('Error creating initial user:', err.message);
            } else {
                console.log('Initial user created with ID:', this.lastID);
            }
        }
    );
    
    db.close();
};

createInitialUser();


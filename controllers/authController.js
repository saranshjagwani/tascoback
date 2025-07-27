const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash], (err) => {
    if (err) return res.status(400).json({ error: err });
    res.json({ message: 'User registered' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ message: 'User not found' });

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(403).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};

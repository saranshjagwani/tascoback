const db = require('../db');

exports.getTasks = (req, res) => {
  db.query('SELECT * FROM tasks WHERE user_id = ?', [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};

exports.createTask = (req, res) => {
  const { title, description, due_date } = req.body;
  db.query('INSERT INTO tasks (user_id, title, description, due_date) VALUES (?, ?, ?, ?)',
    [req.user.id, title, description, due_date], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Task created' });
    });
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, status } = req.body;
  db.query('UPDATE tasks SET title=?, description=?, due_date=?, status=? WHERE id=? AND user_id=?',
    [title, description, due_date, status, id, req.user.id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Task updated' });
    });
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id=? AND user_id=?', [id, req.user.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Task deleted' });
  });
};

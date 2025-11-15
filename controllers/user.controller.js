const User = require('../models/user.model');

// GET /api/users
exports.getAllUsers = (req, res) => {
    User.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// GET /api/users/:id
exports.getUserById = (req, res) => {
    User.getById(req.params.id, (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
        res.json(user);
    });
};

// POST /api/users
exports.createUser = (req, res) => {
    if (!req.body?.name || !req.body?.email) {
        return res.status(400).json({ message: 'name & email wajib diisi' });
    }
    User.create(req.body, (err, created) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(created);
    });
};

// PUT /api/users/:id
exports.updateUser = (req, res) => {
    User.update(req.params.id, req.body, (err, ok) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!ok) return res.status(404).json({ message: 'User tidak ditemukan' });
        res.json({ message: 'User berhasil diperbarui' });
    });
};

// DELETE /api/users/:id
exports.deleteUser = (req, res) => {
    User.delete(req.params.id, (err, ok) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!ok) return res.status(404).json({ message: 'User tidak ditemukan' });
        res.json({ message: 'User berhasil dihapus' });
    });
};

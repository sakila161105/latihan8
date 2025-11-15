const express = require('express');
const app = express();
const PORT = 8081;

app.use(express.json());

// Routes
const userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World');
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

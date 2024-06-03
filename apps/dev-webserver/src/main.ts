import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(bodyParser.json());

const SECRET_KEY = 'your_secret_key';
const ACCESS_TOKEN_EXPIRY = '1h';
const REFRESH_TOKEN_EXPIRY = '1d';

let todos = [];
const users = [];
const refreshTokens = [];

// Generate Access and Refresh Tokens
function generateTokens(user) {
    const accessToken = jwt.sign(user, SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const refreshToken = jwt.sign(user, SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRY });
    refreshTokens.push(refreshToken);
    return { accessToken, refreshToken };
}

// Middleware to authenticate access token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Login endpoint
app.post('/api/login/', (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const user = { email }; // Simplified for example, should validate user
        const tokens = generateTokens(user);
        return res.status(200).json(tokens);
    }
    return res.status(400).json({ message: 'Invalid credentials' });
});

// Register endpoint
app.post('/api/register/', (req, res) => {
    const { email, password, password2, first_name, last_name } = req.body;
    if (email && password && password2 && first_name && last_name) {
        users.push({ email, password, first_name, last_name });
        return res.status(201).json({ email, first_name, last_name });
    }
    return res.status(400).json({ message: 'Invalid data' });
});

// List all todos
app.get('/api/todos/', authenticateToken, (req, res) => {
    return res.status(200).json(todos);
});

// Create a todo
app.post('/api/todos/', authenticateToken, (req, res) => {
    const { description } = req.body;
    if (description) {
        const todo = { id: todos.length + 1, description, done: false };
        todos.push(todo);
        return res.status(201).json(todo);
    }
    return res.status(400).json({ message: 'Invalid data' });
});

// Get a specific todo by ID
app.get('/api/todos/:todo_id', authenticateToken, (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.todo_id));
    if (todo) {
        return res.status(200).json(todo);
    }
    return res.status(404).json({ message: 'Todo not found' });
});

// Update a specific todo by ID
app.put('/api/todos/:todo_id', authenticateToken, (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.todo_id));
    const { description, done } = req.body;
    if (todo && description !== undefined && done !== undefined) {
        todo.description = description;
        todo.done = done;
        return res.status(200).json({ message: 'Todo updated successfully' });
    }
    return res.status(400).json({ message: 'Invalid data or Todo not found' });
});

// Delete a specific todo by ID
app.delete('/api/todos/:todo_id', authenticateToken, (req, res) => {
    todos = todos.filter(t => t.id !== parseInt(req.params.todo_id));
    return res.status(200).json({ message: 'Todo deleted successfully' });
});

// Refresh token
app.post('/api/token/refresh/', (req, res) => {
    const { refresh } = req.body;
    if (!refresh || !refreshTokens.includes(refresh)) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }

    jwt.verify(refresh, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        const newTokens = generateTokens({ email: user.email });
        return res.status(200).json(newTokens);
    });
});

// Verify token
app.post('/api/token/verify/', (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: 'Invalid token' });

    jwt.verify(token, SECRET_KEY, (err) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        return res.status(200).json({ message: 'Token verified' });
    });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

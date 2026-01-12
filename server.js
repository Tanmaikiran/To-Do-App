const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

// --- DATABASE CONNECTION ---
// Ensure this is your correct connection string
const mongoURI = "mongodb+srv://admin:Tannu%402006@cluster0.0cpngfx.mongodb.net/?appName=Cluster0";

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log(err));

// --- MIDDLEWARE ---
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // <--- NEW: Allows server to read JSON data
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true
}));

// --- DATABASE MODELS ---
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

const todoSchema = new mongoose.Schema({
    text: String,
    isCompleted: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Todo = mongoose.model('Todo', todoSchema);


// --- ROUTES ---

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = new User({ email, password });
        await newUser.save();
        res.redirect('/'); 
    } catch (err) {
        console.log(err);
        res.send("Error: User might already exist.");
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });

    if (foundUser && foundUser.password === password) {
        req.session.userId = foundUser._id;
        res.redirect('/app');
    } else {
        res.send("Invalid Email or Password. <a href='/'>Try Again</a>");
    }
});

app.get('/app', async (req, res) => {
    if (!req.session.userId) return res.redirect('/');
    const tasks = await Todo.find({ user: req.session.userId });
    res.render('index', { todoTasks: tasks });
});

// --- API ROUTES (JSON RESPONSES) ---

// Add Task
app.post('/add', async (req, res) => {
    if (!req.session.userId) return res.json({ error: 'Not logged in' });

    const newTask = new Todo({
        text: req.body.newtodo,
        isCompleted: false,
        user: req.session.userId
    });
    await newTask.save();
    res.json(newTask); // Send back the new task data instead of reloading
});

// Delete Task
app.post('/delete', async (req, res) => {
    await Todo.findByIdAndDelete(req.body.id);
    res.json({ success: true });
});

// Toggle Task
app.post('/toggle/:id', async (req, res) => {
    const taskId = req.params.id;
    const task = await Todo.findById(taskId);
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
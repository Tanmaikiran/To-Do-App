To-Do App
Hey! This is a full-stack task manager I built because I wanted a to-do list that actually looks good. Most task apps are pretty boring, so I focused on giving this one a "dreamy" vibe with a glassmorphism UI and smooth animations.
It’s not just a frontend demo, though—it has a full backend with secure login/signup, so every user gets their own private workspace.

Features
Glassmorphism UI: Translucent cards and glowing buttons.

User Accounts: You can Sign Up and Login (passwords are stored safely).

Instant Updates: I used JavaScript (AJAX) so you can add, check, or delete tasks without the page annoying you by reloading every time.

Database: Everything is saved to MongoDB Atlas, so your tasks don't disappear when you close the tab.

Tech Stack
Frontend: EJS (HTML templating), CSS (Custom styling, no frameworks).

Backend: Node.js, Express.js.

Database: MongoDB (using Mongoose).

How to Run It
If you want to try this out on your own machine:

Clone the repo

Bash

git clone https://github.com/Tanmaikiran/aesthetic-todo-app.git
cd aesthetic-todo-app
Install the dependencies

npm install
Set up the Database

You'll need a MongoDB connection string.

Go to server.js and replace the mongoURI variable with your own link.

Run the server

Bash

node server.js
Then open http://localhost:3000 in your browser.

Notes
I spent a lot of time tweaking the CSS to get the transparency just right on the input bar. The background is fetched from Unsplash to keep the night sky theme.

Enjoy using it!

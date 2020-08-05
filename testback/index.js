const express = require("express");

const app = express();

const port = 8000;

app.get("/", (req, res) => {
  return res.send("Hi there..");
});

const admin = (req, res) => {
  return res.send("This is admin from method");
};

const isAdmin = (req, res, next) => {
  console.log(`isAdmin is running`);
  next();
};

const isLoggedIn = (req, res, next) => {
  console.log(`isLoggedIn is running`);
  next();
};

app.get("/admin", isLoggedIn, isAdmin, admin);

app.get("/login", (req, res) => {
  return res.send("Hi there.. You are logged in");
});

app.get("/myname", (req, res) => {
  return res.send("Hi there.. You are logged in as Nishant");
});

app.get("/dashboard", (req, res) => {
  return res.send("Hi there.. Your Dashboard");
});

app.get("/logout", (req, res) => {
  return res.send("Hi there.. You are logged out");
});

app.listen(port, () => {
  console.log("Server is up and running....");
});

// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

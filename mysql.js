import express from "express";
import mysql from "mysql";

// Create Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodeMySQL",
});

// Connect Database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Database Connected");
});

const app = express();

// Create Database
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodeMySQL";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database Created");
  });
});

// Create Table
app.get("/createtable", (req, res) => {
  let sql =
    "CREATE TABLE user(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(45))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Table Created");
  });
});

// Insert Data
app.get("/adduser", (req, res) => {
  let user = {
    name: "Muhammad Ali Akbar",
    email: "Akbar@Akbar.com",
    password: "12345",
  };
  let sql = "INSERT INTO user SET ?";
  let query = db.query(sql, user, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("User Created");
  });
  //   console.log(query);
});

// Select Data
app.get("/selectuser", (req, res) => {
  let sql = "SELECT * FROM user";
  db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});

// Select Single Data
app.get("/user/:id", (req, res) => {
  let sql = `SELECT * FROM user WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

// Update Data
app.get("/updateuser/:id", (req, res) => {
  let updateuser = "Ali Akbar";
  let sql = `UPDATE user SET name = '${updateuser}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

// Delete Data
app.get("/delete/:id", (req, res) => {
  let sql = `DELETE from user WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

app.listen(3000, () => {
  console.log("Server is running");
});

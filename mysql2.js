import mysql from "mysql2";
import express from "express";

const app = express();

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "notes_app",
  })
  .promise();

async function getNotes() {
  const [rows] = await pool.query("SELECT * from notes");
  return rows;
}

async function getNote(id) {
  // const [rows] = await pool.query(`SELECT * from notes WHERE id = ${id}`); untrusted method to (can lead to SQL Injection)
  const [rows] = await pool.query(`SELECT * from notes WHERE id = ?`, [id]);
  return rows[0];
}

async function createNote(title, content) {
  const [result] = await pool.query(
    `INSERT INTO notes (title, contents) VALUES (?, ?)`,
    [title, content]
  );
  const id = result.insertId;
  // return id;
  return getNote(id);
}

const res = await createNote("tesast", "tessadsadt desc");
console.log(res);

app.listen(3000, () => {
  console.log("Server is running");
});

app.get("/notes", async (req, res) => {
  const notes = await getNotes();
  res.json(notes);
});

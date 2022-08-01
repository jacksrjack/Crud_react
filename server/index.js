const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "sua senha",
    database: "seu banco",
});

app.use(cors());
app.use(express.json());

app.post("/cadastrar", (req, res) =>{
   const { nome } = req.body;
   const { descricao } = req.body;
   const { paginas } = req.body;

   let SQL = "INSERT INTO livros (nome, descricao, paginas) VALUES ( ?, ?, ?)";

   db.query(SQL, [nome, descricao, paginas], (err, result) => {
    res.send(result);
   });
});

app.get("/getLista", (req, res) =>{
    let SQL = "SELECT * FROM livros ORDER BY id desc";

    db.query(SQL, (err, result) =>{
        if(err) console.log(err)
        else res.send(result);
    })
});

app.put("/edit", (req, res) => {
    const {id} = req.body;
    const {nome} = req.body;
    const {descricao} = req.body;
    const {paginas} = req.body;

    let SQL = "UPDATE livros SET nome = ?, descricao = ?, paginas = ? WHERE id = ?";

    db.query(SQL, [nome, descricao, paginas, id], (err, result) => {
        if(err) console.log(err)
        else res.send(result);
    })
});

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    let SQL = "DELETE FROM livros WHERE id = ?";
    db.query(SQL, [id], (err, result) => {
        if (err) console.log(err)
        else res.send(result);
    });

});

app.listen(3001, () => {
    console.log("Executando...");
});
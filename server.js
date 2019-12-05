const path = require("path");
const express = require("express");
const app = express();
const mysql = require("mysql");

app.use(express.static(__dirname + '/dist/promiseScrum'));
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Authorization');
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    return res.status(200).json({});
  }
  next();
});

//let m = "mysql://b1bc029546ae83:23325773@us-cdbr-iron-east-05.cleardb.net/heroku_c1e8000a9e0c66c?reconnect=true";
// let con = mysql.createConnection({
//   host:"localhost",
//   user: "root",
//   password: "0babylimited",
//   database: "chat_messages"
// });

let con = mysql.createPool({
  host:"us-cdbr-iron-east-05.cleardb.net",
  user: "b1bc029546ae83",
  password: "23325773",
  database: "heroku_c1e8000a9e0c66c"
});



let mySql = `CREATE TABLE IF NOT EXISTS chat ( id INT(10) NOT NULL AUTO_INCREMENT , name VARCHAR(50) NOT NULL , email VARCHAR(50) NOT NULL , message TEXT NOT NULL , time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (id))`;

con.query(mySql, (err, result) => {
  if(err) throw err ;
});


app.get("/message", (req, res) => {
    const sql = `SELECT * FROM chat`;
    con.query(sql,  (err, result) => {
      if (err) throw err;
      res.send(result);

  }); 
})

app.get('/*', function(req,res){
  res.sendFile(path.join(__dirname, '/dist/promiseScrum/index.html'));
});

app.post("/message", (req, res) => {
  
    const sql = `INSERT INTO chat (name, email, message) VALUES("${req.body.user}", "${req.body.email}", "${req.body.message}")`;
    con.query(sql,  (err, result) => {
      if (err) throw err;
      res.send({success:"Inserted"});
      
    });
})



app.listen(process.env.PORT || 3000, function() {
  console.log("Listening");
});


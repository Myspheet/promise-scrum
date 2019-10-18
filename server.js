const path = require("path");
const express = require("express");
const app = express();

app.use(express.static(__dirname + '/dist/promiseScrum'));
app.get('/*', function(req,res){
  res.sendFile(path.join(__dirname, '/dist/promiseScrum/index.html'));
});

app.listen(process.env.PORT || 3000);

// App Dependencies
let express = require("express");
let path = require("path");
let fs = require('fs');


// Express and Port Number
var app = express();
var PORT = process.env.PORT || 8080;

//Data Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//Routes

//Gets
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
  });

app.get("public/assets/js/index.js", function(req, res) {
    res.sendFile(path.join(__dirname, "./assets/js/index.js"));
  });

app.get("/public/assets/css/styles.css", function(req, res) {
    res.sendFile(path.join(__dirname, "./assets/css/styles.css"));
  });

//Post
app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    console.log(newNote);
    newNote.id = newNote.title.replace(/\s+/g, "").toLowerCase()
    fs.readFile("./db/db.json", 'utf-8',(err,data) => {
      let oldNote = JSON.parse(data)
      //console.log(oldNote)
      oldNote.push(newNote)
      fs.writeFile("./db/db.json", JSON.stringify(oldNote), () => {})
      res.json(newNote);
    })

  });

//Deletes
app.delete("/api/notes/:id", function(req,res){
    let id = req.params.id;
    fs.readFile("./db/db.json", 'utf-8',(err,data) => {
      let notesArray = JSON.parse(data)
      
      for (let i=0; i < notesArray.length; i++) {
        if (notesArray.id !== id){
          notesArray.splice(i, 1)
          }
        }
        fs.writeFile("./db/db.json", JSON.stringify(notesArray), () => {})
        res.json(notesArray)
      });
    })
    

  



  //Start server listening
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
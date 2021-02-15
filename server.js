// App Dependencies
let express = require("express");
let path = require("path");
let fs = require('fs');


// Express and Port Number
var app = express();
var PORT = process.env.PORT || 8080;

// Data Parsing Using Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './Develop/public')));

// Routes

// Gets

// Home Page - Index
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
  });
// Home Page
app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
  });
// Notes Page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
  });
// DB.json
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/db/db.json"));
  });
// Index.js
app.get("public/assets/js/index.js", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/assets/js/index.js"));
  });
// CSS Page
app.get("/public/assets/css/styles.css", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/assets/css/styles.css"));
  });

//Post
app.post("/api/notes", function(req, res) {
    let createNote = req.body;
    console.log(createNote);
    createNote.id = createNote.title.replace(/\s+/g, "").toLowerCase()
    fs.readFile("./Develop/db/db.json", 'utf-8',(err,data) => {
      let previousNote = JSON.parse(data)
      //console.log(oldNote)
      previousNote.push(createNote)
      fs.writeFile("./Develop/db/db.json", JSON.stringify(previousNote), () => {})
      res.json(createNote);
    })

  });

//Deletes
app.delete("/api/notes/:id", function(req,res){
    let id = req.params.id;
    fs.readFile("./Develop/db/db.json", 'utf-8',(err,data) => {
      if (err) throw err
      let notesQueue = JSON.parse(data)
      for (let i=0; i < notesQueue.length; i++) {
        if (notesQueue.id !== id) {
          notesQueue.splice(id, 1)
          }
      }
      fs.writeFile("./Develop/db/db.json", JSON.stringify(notesQueue), () => {})
        res.json(notesQueue)
      });
    })
    

  



  //Start server listening
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
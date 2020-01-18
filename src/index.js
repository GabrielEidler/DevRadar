// ===========================================================
// SETUP
// ===========================================================

const express = require("express"),
      app = express(),
      routes = require("./routes"),
      mongoose = require("mongoose");


//express.json needs to come before.
app.use(express.json());
app.use(routes);



// ===========================================================
// DATABASE STUFF
// ===========================================================
mongoose.connect(
    process.env.DATABASEURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  );

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("connected to db");
  });



// ===========================================================
// ROUTES: HTTP Methods
// ===========================================================


app.get("/", (req, res)=>{
    res.json({message: "Hello Omnistack!"});
});




app.listen(process.env.PORT), ()=>{
    console.log("Server is on!");
};
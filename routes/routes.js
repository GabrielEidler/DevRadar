var express = require("express");
var routes = express.Router();


routes.get("/users", (req, res)=>{
    res.json({message: "User Page"});
});

module.exports = routes;
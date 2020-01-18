const   express = require("express"),
        DevController = require("./controllers/DevController"),
        SearchController = require("./controllers/SearchController"),
        routes = express.Router();



//NEW
routes.post('/devs',DevController.store);

//INDEX
routes.get('/devs', DevController.index);

//SHOW
// /search is not RESTful at all, it should be /devs/:id, but I 
// LITERALLY have no time to refactor this, maybe at a future date...
routes.get('/search', SearchController.index);

module.exports = routes;

//DevController.store
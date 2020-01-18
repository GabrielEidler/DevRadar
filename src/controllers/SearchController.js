const   Dev  = require("../models/Dev"),
        parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {
    
    async index(req, res){
        const {latitude, longitude, techs} = req.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
            //retorna devs que trabalham nas mesmas tecnologias inseridas no query
                $in: techsArray, 
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',  
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
            
        });

        return res.json({devs});
    }
}
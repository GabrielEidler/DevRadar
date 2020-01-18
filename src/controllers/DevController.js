// Responsável por receber a requisição 
// ativar o que ele eprecisa fazer, e ativar uma resposta

const   axios = require("axios"),
        parseStringAsArray = require('../utils/parseStringAsArray'),
        Dev = require("../models/Dev");


//  index, show, store, update, destroy


module.exports = {
    
    async index(req, res){
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res){
        //essas são as informações que mandamos ao github
        const {github_username, techs, latitude, longitude} = req.body;
        //ao usar a crase, posso colocar variaveis dentro
        //o flag async basicamente diz que a função pode demorar para responder
        // o await aguarda ter uma resposta para salvar o resultado em res

        //com o let, a variavel dev pode ser sobreposta
        let dev = await Dev.findOne({github_username});

       if(!dev){
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
        // o name = login significaa que basicamente caso name não tenha
        // valor, o seu valor se torna o login, ou seja
        //isso é basicamente eu setando o valor padrão do name
        const {name = login, avatar_url, bio} = apiResponse.data;
     
        const techsArray = parseStringAsArray(techs);
    
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }
    
         dev = await Dev.create({
            //aqui o nome da propriedade é o mesmo nome da variável
            //logon precisa ter os dois pontos ':'
            github_username, 
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        });
       }
    
        return res.json(dev);
    }


};
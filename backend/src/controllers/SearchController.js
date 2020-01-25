const Dev = require("../models/Dev")
const parseStringAsArray = require("../utils/parseStringAsArray")

module.exports = {

    async index(request, response){
        //buscar todos devs num raio de 10km
        //filtrar por tecnologias


        const {latitude, longitude, techs} = request.query;

        const techsArray = parseStringAsArray(techs);


        const devs = await Dev.find({

            techs: {
                $in: techsArray,
            },

            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000, //10 mil metros
                },
            },

        });

        return response.json({devs});
    }


}
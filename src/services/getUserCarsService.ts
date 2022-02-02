const modelCar = require("../database/models").car

class getUserCarsService {
    async execute(email: string){

        const emptyResponse = { message: "Você não tem carros cadastrados!" }

        const result = await modelCar.findAll({
            where: { dono: email }
        })
        .then((data) => {

            if(data.length == 0) {
                return {
                    data: emptyResponse,
                    success: true,
                    blank : true
                }
            }else{
                return {
                    data: data,
                    success: true,
                    blank : false
                } 
            }
            
        }).catch((err) => {
            return {
                dataErr: err,
                success: false,
                blank: false
            }
        })
        return result
    }
}
module.exports = getUserCarsService
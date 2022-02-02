import { Request, response, Response } from 'express'
const service = require('../services/getUserCarsService')

class getUserCarsController{
    async handle(req: Request, res: Response){
        const GetUserCarsService = new service()
        const result = await GetUserCarsService.execute(req.body.email)

        if(result.success == false){
            res.status(500).json({
                message: "Houve um erro interno",
                err: result.dataErr
            })
        }else{
            result.blank == true ? res.status(404).json(result) : res.status(200).json(result)
        }

    }
}
module.exports = getUserCarsController
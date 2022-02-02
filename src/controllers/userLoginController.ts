import { Request, Response } from 'express'
const service = require('../services/userLoginService')
const jwt = require('jsonwebtoken')
const SECRET = "yanbura7k"

class userLoginController {

    async handle(req: Request, res: Response) {
        const UserLoginService = new service()
        const result = await UserLoginService.execute({email: req.body.email, password: req.body.password})

        if(result.status == 200){
            const token = jwt.sign({ email: req.body.email }, SECRET, { expiresIn: 600  })
            res.status(200).json({auth: true, token: token})
        }
        else
        {
            res.status(result.status).json({result: result, auth: false})
        }
    }   
}
module.exports = userLoginController
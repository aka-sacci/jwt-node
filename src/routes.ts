import { Router, Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken')
const SECRET = "yanbura7k"

const router = Router()
    //importação de rotas
        const userLoginController = require('./controllers/userLoginController')
        const UserLoginController = new userLoginController

        const getUserCarsController = require('./controllers/getUserCarsController')
        const GetUserCarsController = new getUserCarsController

    //Middlewares
        //JWT
        const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization;
            jwt.verify(token, SECRET, (err: any, decoded: any) => {
                if(err) return res.status(401).send(err)

                req.body.email = decoded.email
                next()
            })
        }

    router.get("/", (req: Request, res: Response) => {
        res.send("Olá mundo!")
    })
    //rota de login
    router.post("/login",  UserLoginController.handle)

    //rota de retorno de carros
    router.get("/cars", verifyJWT, GetUserCarsController.handle)


    


    
exports.router = router
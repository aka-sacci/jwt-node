const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const { router } = require("./routes")

//Config
    //CORS
    app.use(cors())

    //Body Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

//ROTAS
    //Router
    app.use(router)

module.exports = app
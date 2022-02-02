import db from '../database/models'
import { Sequelize } from 'sequelize'
const seeder = require('../database/seeders/20220202133623-insertCars.js')
const request = require('supertest')
const server = require("../server")
const jwt = require('jsonwebtoken')
const SECRET = "yanbura7k"

describe("getUserCarsController", () => {
    beforeAll(async () => {
        await db.sequelize.sync({force: true})
        await seeder.up(db.sequelize.getQueryInterface(), Sequelize)
    })
    afterAll(async () => {        
        await seeder.down(db.sequelize.getQueryInterface(), Sequelize)
        await db.sequelize.close()
    })
    
    it("Deve retornar status 200 para retorno de carros do usuário sacci@mail.com", async () => {
        const email = "sacci@mail.com"
        const token = jwt.sign({ email: email }, SECRET, { expiresIn: 15  })
        var commonHeaders = { "authorization": token };

        const res = await request(server)
        .get('/cars')
        .set(commonHeaders)
        .send({
            email: email
        })
        expect(res.status).toBe(200)
    })

    it("Deve retornar status 404 para retorno de carros do usuário wrongmail@mail.com", async () => {
        const email = "wrongmail@mail.com"
        const token = jwt.sign({ email: email }, SECRET, { expiresIn: 15  })
        var commonHeaders = { "authorization": token };

        const res = await request(server)
        .get('/cars')
        .set(commonHeaders)
        .send({
            email: email
        })
        expect(res.status).toBe(404)
    })


    
})
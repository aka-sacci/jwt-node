import db from "../database/models"
const { Sequelize } = require('sequelize')
const request = require('supertest')
const seeder = require('../database/seeders/20220201134254-insertUserLogin.js')
const server = require("../server")


describe("userLoginController", () => {
    beforeAll(async () => {
        await db.sequelize.sync({force: true})
        await seeder.up(db.sequelize.getQueryInterface(), Sequelize)
    })

    afterAll(async () => {
        await seeder.down(db.sequelize.getQueryInterface(), Sequelize)
        await db.sequelize.close()
    })

    
    it("Deve retornar o código 200", async () => {
        const response = await request(server)
            .post('/login')
            .send({
                email: "sacci@mail.com",
                password: "teste"
            })

        expect(response.status).toBe(200)
    })

    it("Deve retornar o código 404", async () => {
        const response = await request(server)
            .post('/login')
            .send({
                email: "sacci@mail.com",
                password: "senhaErrada"
            })

        expect(response.status).toBe(404)
    })
})
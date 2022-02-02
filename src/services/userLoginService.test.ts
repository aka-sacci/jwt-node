const { Sequelize } = require('sequelize')
import db from "../database/models"
const seeder = require('../database/seeders/20220201134254-insertUserLogin.js')
const service = require('./userLoginService')
describe("userLoginService", () => {
    const UserLoginService = new service()
    beforeAll(async () => {
        await db.sequelize.sync({force: true})
        await seeder.up(db.sequelize.getQueryInterface(), Sequelize)
    })

    afterAll(async () => {
        await seeder.down(db.sequelize.getQueryInterface(), Sequelize)
        await db.sequelize.close()
    })

    it("Deve retornar que o login e senha são válidos", async () => {

        const result = await UserLoginService.execute({email: "sacci@mail.com", password: "teste"})
        expect(result.success).toBe(true)
       
    })
    it("Deve retornar que o login e senha são inválidos", async () => {

        const result = await UserLoginService.execute({email: "sacci@mail.com", password: "aa"})
        expect(result.success).toBe(false)
       
    })
})
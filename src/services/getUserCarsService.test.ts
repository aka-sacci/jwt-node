import db from "../database/models"
import {Sequelize} from "sequelize"
const seeder = require('../database/seeders/20220202133623-insertCars.js')
const service = require("./getUserCarsService")
describe("getUserCarsService", () => {
    const GetUserCarsService = new service()
    beforeAll(async () => {
        await db.sequelize.sync({force: true})
        await seeder.up(db.sequelize.getQueryInterface(), Sequelize)
    })

    afterAll(async () => {
        await seeder.down(db.sequelize.getQueryInterface(), Sequelize)
        await db.sequelize.close()
    })
    
    it('Deve retornar os carros pertencentes ao usuário sacci@mail.com', async () => {
        const mail = "sacci@mail.com"

        const result = await GetUserCarsService.execute(mail)

        expect(result.success).toBe(true)
        expect(result.blank).toBe(false)
    })

    it('Deve retornar que não há carros pertencentes ao usuário wrongmail@mail.com', async () => {
        const mail = "wrongmail@mail.com"

        const result = await GetUserCarsService.execute(mail)

        expect(result.success).toBe(true)
        expect(result.blank).toBe(true)
    })

})
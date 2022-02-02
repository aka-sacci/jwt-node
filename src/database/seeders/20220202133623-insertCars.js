'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    var date = new Date(Date.now());
    date = date.toISOString().slice(0, 19).replace('T', ' ');
   
    await queryInterface.bulkInsert('car', [{
      marca: 'Fiat',
      modelo: "Palio Weekend",
      ano: 1998,
      dono: "sacci@mail.com",
      createdAt: date,
      updatedAt: date
    }], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('car', null, {});
  }
};

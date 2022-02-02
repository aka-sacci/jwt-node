'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    var date = new Date(Date.now());
    date = date.toISOString().slice(0, 19).replace('T', ' ');
   
    await queryInterface.bulkInsert('userlogin', [{
      email: 'sacci@mail.com',
      password: "teste",
      name: "Lucas Sacci",
      createdAt: date,
      updatedAt: date
    }], {});
    
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('userlogin', null, {});
  }
};

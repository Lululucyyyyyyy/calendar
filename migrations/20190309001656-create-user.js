'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });

    Users.associate = models => {
      Payment.hasOne(models.Events)
    };
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add column 'jwtVersion' to table 'Accounts'
    return queryInterface.addColumn('Accounts', 'jwtVersion', {
      type: Sequelize.INTEGER,
      allowNull: false,
      // Set column location
      after: 'password',
      defaultValue: 0
    })
  },

  down: (queryInterface, Sequelize) => {
    // Remove column
    return queryInterface.removeColumn('Accounts', 'jwtVersion')
  }
};

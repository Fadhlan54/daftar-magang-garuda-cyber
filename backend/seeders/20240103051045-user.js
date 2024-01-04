'use strict'

const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const insertUsers = await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: uuidv4(),
          name: 'admin',
          role: 'admin',
          balance: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {
        returning: true,
      },
    )

    const auths = insertUsers.map((user) => ({
      id: uuidv4(),
      email: `${user.name}@garuda.com`.toLowerCase(),
      password: '$2a$10$VOZdAZlTEN6tuhmMU1g1xOJ9OPvlJutSqSa0m1AT7bJC2PZgJRzVa',
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    await queryInterface.bulkInsert('Auths', auths)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Auths', null, {})
  },
}

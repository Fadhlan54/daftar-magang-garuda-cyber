'use strict'

const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [
      {
        id: uuidv4(),
        name: 'Laptop Gimang',
        imageUrl:
          'https://images.unsplash.com/photo-1625266008996-67bc5f9ffb40?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Laptop gimang siap hajar semua game rata kanan 100 fps',
        price: 5000000,
        category: 'laptop',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'HP Sumsang',
        imageUrl:
          'https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D',
        description: 'Kamera jernih bisa zoom planet namek',
        price: 2000000,
        category: 'smartphone',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'HP Smangsung',
        imageUrl:
          'https://images.unsplash.com/photo-1480694313141-fce5e697ee25?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNtYXJ0cGhvbmV8ZW58MHx8MHx8fDA%3D',
        description: 'Saingannya HP Sumsang',
        price: 1999999,
        category: 'smartphone',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'RAM full RGB 8GB',
        imageUrl:
          'https://images.unsplash.com/photo-1592664474505-51c549ad15c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UkFNfGVufDB8fDB8fHww',
        description: 'Ukuran tidak perlu, full RGB nomor satu',
        price: 1000000,
        category: 'PC component',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await queryInterface.bulkInsert('Products', products, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {})
  },
}

'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
      })
      Transaction.belongsTo(models.Product, {
        foreignKey: {
          name: 'productId',
          allowNull: false,
        },
      })
    }
  }
  Transaction.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: DataTypes.UUID,
      productId: DataTypes.UUID,
      amount: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      productPrice: DataTypes.INTEGER,
      discountPrice: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      voucherCode: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Transaction',
    },
  )
  return Transaction
}

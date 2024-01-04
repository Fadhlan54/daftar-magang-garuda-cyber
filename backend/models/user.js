'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Auth, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
      })
      User.hasMany(models.Transaction, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
      })
      User.hasMany(models.Voucher, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
      })
      User.hasMany(models.Notification, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
      })
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      role: DataTypes.STRING,
      balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  )
  return User
}

'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    static associate(models) {
      Voucher.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
      })
    }
  }
  Voucher.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      voucherCode: DataTypes.STRING,
      discountPrice: DataTypes.INTEGER,
      userId: DataTypes.UUID,
      isUsed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      expiredAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Voucher',
    },
  )
  return Voucher
}

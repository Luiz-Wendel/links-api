module.exports = (sequelize, DataTypes) => {

  const Account = sequelize.define("Account", {
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jwtVersion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  })

  Account.associate = (models) => {
    Account.hasMany(models.Link, {
      foreignKey: 'accountId'
    })
  }

  // delete password when showing json
  Account.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }

  return Account
}

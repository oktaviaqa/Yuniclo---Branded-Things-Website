'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {foreignKey: 'authorId'})
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required!'
        },
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Please use the correct email format: user@example.com'
        }
      } 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Passwrod is required,'
        },
        notEmpty: {
          msg: 'Password is required'
        },
        len: {
          args: [5, 10],
          msg: 'The password must be 5 to 10 characters long'
        }       
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async(user) => {
        if (user.password) {
          const salt = bcrypt.genSaltSync(10)
          user.password = bcrypt.hashSync(user.password, salt)
        }
      }
    }
  });
  return User;
};
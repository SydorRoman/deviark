
const { sequelize } = require('../db/connection');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});

const addUser = (data) => {
  return new Promise(async (resolve, reject) => {
    await User.create(data)
      .then(resolve)
      .catch(reject);
  });
};

const updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    await User.update(
      { ...data },
      { where: { email: data.email } })
    .then(resolve)
    .catch(reject);
  });
};

const getByEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    await User.findOne({ where: { email }, raw: true })
      .then(resolve)
      .catch(reject);
  });
};

const getAllUsers = (date = null) => {
  console.log(date);
  return new Promise(async (resolve, reject) => {
    await User.findAll({ where: {
      createdAt: {
        [Op.gt]: new Date(date),
      },
  },
  order: [['createdAt', 'DESC']] 
  })
      .then(resolve)
      .catch(reject);
  });
};

const deleteUser = (email) => {
  return new Promise(async (resolve, reject) => {
    await User.destroy({ where: { email }, raw: true })
      .then(resolve)
      .catch(reject);
  });
};

module.exports = {
  addUser,
  getByEmail,
  updateUser,
  getAllUsers,
  deleteUser
};

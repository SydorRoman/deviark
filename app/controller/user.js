const apiHelper = require('../helpers/api');
const userModel = require('../models/user');
const getError = require('../helpers/error-maker');
const constants = require('../constants/messages');
const { key } = require('../constants/key');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(key);

const getAllUsers = async (req, res) => {
  const users = await userModel.getAllUsers(req.query.date);
  return apiHelper.builder(res, users)
};

const addUser = async (req, res) => {
  const { body } =  req;
  if (!body.email) apiHelper.builder(res, getError(constants.EMAIL_REQUIRED, 403));
  if (!body.username) apiHelper.builder(res, getError(constants.NAME_REQUIRED, 403));
  if (!body.password) apiHelper.builder(res, getError(constants.PASSWORD_REQUIRED, 403));

  const user = await userModel.getByEmail(body.email);
  body.password = cryptr.encrypt(body.password);
  if (user) {
    await userModel.updateUser(body);
    return apiHelper.builder(res, constants.UPDATED);
  }
  await userModel.addUser(body);
  
  return apiHelper.builder(res, constants.CREATED);
};

const deleteUser = async (req, res) => {
  const { email } = req.params;
  console.log(email);
  await userModel.deleteUser(email);
  return apiHelper.builder(res, constants.DELETED)
};

module.exports = {
  getAllUsers,
  addUser,
  deleteUser
};

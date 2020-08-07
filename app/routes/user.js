const express = require('express');

const apiHelper = require('../helpers/api');
const userController = require('../controller/user');
const router = express.Router();

router
  .get('/', userController.getAllUsers)
  .post('/', userController.addUser)
  .delete('/:email', userController.deleteUser)
 
router.use((req, res, next) => {
  next('Not Found');
});

// Error handler
router.use((err, req, res) => {
  apiHelper.builder(res, getError(err, 500));
});

module.exports = router;

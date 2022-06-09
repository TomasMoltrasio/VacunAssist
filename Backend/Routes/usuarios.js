const { Router } = require('express');
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  logIn,
} = require('../Services/users.service');

const router = Router();

router.route('/').post(createUser).get(getUsers);

router
  .route('/:id')
  .get(getUser)
  .post(logIn)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;

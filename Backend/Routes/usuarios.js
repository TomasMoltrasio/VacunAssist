const { Router } = require('express');
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../Services/users.service');

const router = Router();

router.route('/').post(createUser).get(getUsers);

router.route('/:id').post(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;

const { Router } = require('express');
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../Services/users.service');

const router = Router();

router.route('/').post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;

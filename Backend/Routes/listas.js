const { Router } = require('express');
const {
  getEspera,
  getEsperas,
  createEspera,
  deleteEspera,
  updateEspera,
} = require('../Services/list.service');

const router = Router();

router.route('/').post(createEspera).get(getEsperas);

router.route('/:id').get(getEspera).patch(updateEspera).delete(deleteEspera);

module.exports = router;

const { Router } = require('express');
const {
  getVacunatorio,
  getVacunatorios,
  createVacunatorio,
  updateVacunatorio,
  deleteVacunatorio,
} = require('../Services/vacunatorios.service');

const router = Router();

router.route('/').post(createVacunatorio).get(getVacunatorios);

router
  .route('/:id')
  .get(getVacunatorio)
  .patch(updateVacunatorio)
  .delete(deleteVacunatorio);

module.exports = router;

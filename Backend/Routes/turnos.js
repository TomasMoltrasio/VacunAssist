const { Router } = require('express');
const {
  createTurn,
  createTurnLast,
  getTurn,
  getTurns,
  deleteTurn,
  deleteTurns,
  updateTurn,
  getAverage,
  getStock,
  getAbsent,
  addAbsent,
  assignTurn,
} = require('../Services/turns.service');

const router = Router();

router.route('/').get(getTurns).post(createTurn).delete(deleteTurns);

router.route('/stock').post(getStock);

router.route('/average').post(getAverage);

router.route('/absent').get(getAbsent).post(addAbsent);

router.route('/assign').post(assignTurn);

router
  .route('/:id')
  .get(getTurn)
  .patch(updateTurn)
  .post(createTurnLast)
  .delete(deleteTurn);

module.exports = router;

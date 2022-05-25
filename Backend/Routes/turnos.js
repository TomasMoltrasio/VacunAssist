const { Router } = require('express');
const {
  createTurn,
  createTurnLast,
  getTurn,
  getTurns,
  deleteTurn,
  deleteTurns,
  updateTurn,
} = require('../Services/turns.service');

const router = Router();

router.route('/').get(getTurns).post(createTurn).delete(deleteTurns);

router
  .route('/:id')
  .get(getTurn)
  .patch(updateTurn)
  .post(createTurnLast)
  .delete(deleteTurn);

module.exports = router;

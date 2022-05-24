const { Router } = require('express');
const {
  createTurn,
  createTurnLast,
  getTurn,
  getTurns,
  deleteTurn,
  updateTurn,
} = require('../Services/turns.service');

const router = Router();

router.route('/').get(getTurns).post(createTurn);

router
  .route('/:id')
  .get(getTurn)
  .patch(updateTurn)
  .post(createTurnLast)
  .delete(deleteTurn);

module.exports = router;

const { check } = require('express-validator');

class EventValidation {
  getDeleteValidator = () => {
    return [check('eventId').not().isEmpty()];
  };

  getUpdateValidator = () => {
    return [
      check('title').isLength({ min: 5 }),
      check('description').isLength({ min: 5 }),
      check('date').isLength({ min: 5 }),
      check('price').isNumeric(),
    ];
  };

  getCreateValidator = () => {
    return [
      check('title').isLength({ min: 5 }),
      check('description').isLength({ min: 5 }),
      check('date').isLength({ min: 5 }),
      check('price').isNumeric(),
    ];
  };
}

module.exports = EventValidation;

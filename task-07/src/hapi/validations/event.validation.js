const Joi = require('@hapi/joi');

class EventValidation {
  getDeleteValidator = () => {
    return {
      payload: Joi.object({
        eventId: Joi.string(),
      }),
    };
  };

  getUpdateValidator = () => {
    return {
      payload: Joi.object({
        title: Joi.string(),
        description: Joi.string(),
        price: Joi.number(),
        date: Joi.string(),
        eventId: Joi.string(),
      }),
    };
  };

  getCreateValidator = () => {
    return {
      payload: Joi.object({
        title: Joi.string(),
        description: Joi.string(),
        price: Joi.number(),
        date: Joi.string(),
      }),
    };
  };
}

module.exports = EventValidation;

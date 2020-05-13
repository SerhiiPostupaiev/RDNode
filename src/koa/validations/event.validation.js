class EventValidation {
  createValidator = async (ctx, next) => {
    ctx.checkBody({
      title: {
        notEmpty: true,
        matches: {
          options: [{ min: 2 }],
        },
        errorMessage: 'Invalid title', // Error message for the parameter
      },
      description: {
        notEmpty: true,
        matches: {
          options: [{ min: 2 }],
        },
        errorMessage: 'Invalid description', // Error message for the parameter
      },
      price: {
        notEmpty: true,
        isInt: {
          errorMessage: 'Invalid price',
        },
      },
      date: {
        notEmpty: true,
        errorMessage: 'Invalid date', // Error message for the parameter
      },
    });

    let errors = await ctx.validationErrors();

    if (errors) {
      ctx.body = errors;
      ctx.status = 422;
      return;
    }

    await next();
  };

  updateValidator = async (ctx, next) => {
    ctx.checkBody({
      title: {
        notEmpty: true,
        matches: {
          options: [{ min: 2 }],
        },
        errorMessage: 'Invalid title', // Error message for the parameter
      },
      description: {
        notEmpty: true,
        matches: {
          options: [{ min: 2 }],
        },
        errorMessage: 'Invalid description', // Error message for the parameter
      },
      price: {
        notEmpty: true,
        isInt: {
          errorMessage: 'Invalid price',
        },
      },
      eventId: {
        notEmpty: true,
        errorMessage: 'Event ID is required',
      },
      date: {
        notEmpty: true,
        errorMessage: 'Invalid date', // Error message for the parameter
      },
    });

    let errors = await ctx.validationErrors();

    if (errors) {
      ctx.body = errors;
      ctx.status = 422;
      return;
    }

    await next();
  };

  deleteValidator = async (ctx, next) => {
    ctx.checkBody({
      eventId: {
        notEmpty: true,
        errorMessage: 'Event ID is required',
      },
    });

    let errors = await ctx.validationErrors();

    if (errors) {
      ctx.body = errors;
      ctx.status = 422;
      return;
    }

    await next();
  };
}

module.exports = EventValidation;

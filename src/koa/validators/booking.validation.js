async function createValidator(ctx, next) {
  ctx.checkBody({
    eventId: {
      notEmpty: true,
      matches: {
        options: [{ min: 2}]
      },
      errorMessage: 'Invalid event id' // Error message for the parameter
    },
  });

  let errors = await ctx.validationErrors();

  if (errors) {
    ctx.body = errors;
    ctx.status = 422;
    return;
  }

  await next();
}

async function deleteValidator(ctx, next) {
  ctx.checkBody({
    bookingId: {
      notEmpty: true,
      matches: {
        options: [{ min: 2}]
      },
      errorMessage: 'Invalid booking id' // Error message for the parameter
    },
  });

  let errors = await ctx.validationErrors();

  if (errors) {
    ctx.body = errors;
    ctx.status = 422;
    return;
  }

  await next();
}

module.exports = {
  createValidator,
  deleteValidator
}

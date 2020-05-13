class UserValidation {
  createValidator = async (ctx, next) => {
    ctx.checkBody({
      email: {
        notEmpty: true,
        isEmail: {
          errorMessage: 'Invalid Email',
        },
      },
      password: {
        notEmpty: true,
        matches: {
          options: [{ min: 2, max: 10 }],
        },
        errorMessage: 'Invalid Password', // Error message for the parameter
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

module.exports = UserValidation;

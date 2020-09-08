class AuthController {
  constructor(entityService) {
    this.entityService = entityService;
  }

  login = async (req, res) => {
    try {
      const result = await this.entityService.login(
        req.body.email,
        req.body.password,
        req.dbContext
      );
      res.send(result);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  signup = async (req, res) => {
    try {
      const result = await this.entityService.signup(
        req.body.email,
        req.body.password,
        req.dbContext
      );
      res.send(result);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };
}

module.exports = AuthController;

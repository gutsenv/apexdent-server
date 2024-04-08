const LoginService = require("./login.service");
const logger = require("../logger/logger");

class LoginController {
  async login(req, res) {
    try {
      const data = await LoginService.login(req.body);
      res.status(200).send(data);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
      console.error("Error:", error);
      logger.error("Error:", error);
    }
  }
}

module.exports = new LoginController();

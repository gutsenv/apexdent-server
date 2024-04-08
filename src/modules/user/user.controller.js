const UserService = require("./user.service");
const { HTTP_STATUS_CODES, ERROR_MESSAGES } = require("../../utils/constants");

class UserController {
  async create(req, res) {
    try {
      const emailExists = await UserService.findByEmail(req.body.email);

      if (emailExists) {
        return res
          .status(HTTP_STATUS_CODES.CONFLICT)
          .json({ message: ERROR_MESSAGES.EMAIL_ALREADY_IN_USE });
      }

      await UserService.create(req.body);
      res
        .status(HTTP_STATUS_CODES.CREATED)
        .json({ message: "User registered successfully." });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  }

  async findById(req, res) {
    try {
      const data = await UserService.findById(req.params.userId);
      res.status(HTTP_STATUS_CODES.OK).json(data);
    } catch (error) {
      console.error("Error:", error);
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  }

  async findByIdAndUpdate(req, res) {
    try {
      const data = await UserService.findByIdAndUpdate(
        req.params.userId,
        req.body
      );
      res.status(HTTP_STATUS_CODES.OK).json(data);
    } catch (error) {
      console.error("Error:", error);
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  }

  async findByIdAndDelete(req, res) {
    try {
      await UserService.findByIdAndDelete(req.params.userId);
      res.status(HTTP_STATUS_CODES.OK).json({ message: "User is deleted." });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  }
}

module.exports = new UserController();

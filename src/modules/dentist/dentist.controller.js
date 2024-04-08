const DentistService = require("./dentist.service");
const { HTTP_STATUS_CODES, ERROR_MESSAGES } = require("../../utils/constants");

class DentistController {
  constructor(dentistService) {
    this.dentistService = dentistService;
  }

  async create(req, res) {
    try {
      const emailExists = await this.dentistService.findByEmail(req.body.email);

      if (emailExists) {
        return res
          .status(HTTP_STATUS_CODES.CONFLICT)
          .json({ message: ERROR_MESSAGES.EMAIL_ALREADY_IN_USE });
      }

      await this.dentistService.create(req.body);
      res
        .status(HTTP_STATUS_CODES.CREATED)
        .json({ message: "Dentist registered successfully." });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  }

  async findById(req, res) {
    const data = await this.dentistService.findById(req.params.dentistId);
    res.json(data);
  }

  async findByIdAndUpdate(req, res) {
    const data = await this.dentistService.findByIdAndUpdate(
      req.params.dentistId,
      req.body
    );
    res.json(data);
  }

  async findByIdAndDelete(req, res) {
    await this.dentistService.findByIdAndDelete(req.params.dentistId);
    res.json("Dentist is deleted.");
  }
}

module.exports = new DentistController(DentistService);

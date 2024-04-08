const AppointmentService = require("./appointment.service");

class AppointmentController {
  async create(req, res) {
    const data = await AppointmentService.create(req.body);
    res.json(data);
  }

  async findByPatientId(req, res) {
    const data = await AppointmentService.findByPatientId(req.params.patientId);
    res.json(data);
  }

  async findById(req, res) {
    const data = await AppointmentService.findById(req.params.appointmentId);
    res.json(data);
  }

  async findByIdAndUpdate(req, res) {
    const data = await AppointmentService.findByIdAndUpdate(
      req.params.appointmentId,
      req.body
    );
    res.json(data);
  }

  async findByIdAndCancel(req, res) {
    await AppointmentService.findByIdAndCancel(req.params.appointmentId);
    res.json("Appointment is cancelled.");
  }
}

module.exports = new AppointmentController();

const AppointmentRepository = require("./appointment.repository");

class AppointmentService {
  async create(data) {
    return await AppointmentRepository.create(data);
  }

  async findByPatientId(patientId) {
    const data = await AppointmentRepository.findByPatientId(patientId);

    if (data) {
      return data.Items;
    }

    return data;
  }

  async findById(appointmentId) {
    const data = await AppointmentRepository.findById(appointmentId);

    if (data) {
      return data.Item;
    }

    return data;
  }

  async findByIdAndUpdate(appointmentId, data) {
    return await AppointmentRepository.findByIdAndUpdate(appointmentId, data);
  }

  async findByIdAndCancel(appointmentId) {
    return await AppointmentRepository.findByIdAndCancel(appointmentId);
  }
}

module.exports = new AppointmentService();

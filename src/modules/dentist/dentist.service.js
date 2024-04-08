const DentistRepository = require("./dentist.repository");
const { hashPassword } = require("../../utils/hash");

class DentistService {
  async create(data) {
    try {
      const hashedPassword = await hashPassword(data.password);
      const dataWithHashedPassword = { ...data, password: hashedPassword };
      return await DentistRepository.create(dataWithHashedPassword);
    } catch (error) {
      console.error("Dentist creation error:", error);
      throw new Error("Failed to create dentist.");
    }
  }

  async findById(dentistId) {
    const data = await DentistRepository.findById(dentistId);

    if (data) {
      return data.Item;
    }

    return data;
  }

  async findByIdAndUpdate(dentistId, data) {
    return await DentistRepository.findByIdAndUpdate(dentistId, data);
  }

  async findByIdAndDelete(dentistId) {
    return await DentistRepository.findByIdAndDelete(dentistId);
  }
}

module.exports = new DentistService();

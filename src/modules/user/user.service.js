const UserRepository = require("./user.repository");
const { hashPassword } = require("../../utils/hash");

class UserService {
  async create(data) {
    try {
      const hashedPassword = await hashPassword(data.password);
      const dataWithHashedPassword = { ...data, password: hashedPassword };
      return await UserRepository.create(dataWithHashedPassword);
    } catch (error) {
      console.error("User creation error:", error);
      throw new Error("Failed to create user.");
    }
  }

  async findByEmail(email) {
    return await UserRepository.findByEmail(email).Count;
  }

  async findById(userId) {
    const data = await UserRepository.findById(userId);

    if (data) {
      /* do not return the password */
      delete data.Item.password;
      return data.Item;
    }

    return data;
  }

  async findByIdAndUpdate(userId, data) {
    return await UserRepository.findByIdAndUpdate(userId, data);
  }

  async findByIdAndDelete(userId) {
    return await UserRepository.findByIdAndDelete(userId);
  }
}

module.exports = new UserService();

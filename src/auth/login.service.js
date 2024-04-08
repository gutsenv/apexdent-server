const LoginRepository = require("./login.repository");
const { comparePasswords } = require("../utils/hash");
const { generateJwt } = require("../utils/generateJwt");

class LoginService {
  async login(params) {
    const data = await LoginRepository.findByEmail(
      params.email,
      params.isDentist
    );

    const user = data.Items.find((u) => u.email === params.email);

    if (user) {
      const passwordsMatch = await comparePasswords(
        params.password,
        user.password
      );

      if (!passwordsMatch) {
        const error = new Error("Invalid credentials.");
        error.statusCode = 404;
        throw error;
      }
    } else {
      const error = new Error("Invalid credentials.");
      error.statusCode = 404;
      throw error;
    }

    return {
      token: generateJwt(user),
      role: user.role,
      id: user._id,
    };
  }
}

module.exports = new LoginService();

const db = require("../core/db");
const dentistDbSchema = require("../modules/dentist/dentist.schema");
const userDbSchema = require("../modules/user/user.schema");

class LoginRepository {
  async findByEmail(email, isDentist) {
    const params = {
      TableName: isDentist ? dentistDbSchema.TableName : userDbSchema.TableName,
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    return await db.scan(params).promise();
  }
}

module.exports = new LoginRepository();

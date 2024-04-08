const db = require("../../core/db");
const userDbSchema = require("./user.schema");
const { v4: uuidv4 } = require("uuid");

class UserRepository {
  constructor() {
    this.tableName = userDbSchema.TableName;
  }

  async create(data) {
    try {
      const params = {
        TableName: this.tableName,
        Item: {
          _id: uuidv4(),
          firstName: data.firstName,
          middleName: data.middleName || "",
          lastName: data.lastName,
          username: data.username,
          email: data.email,
          mobileNumber: data.mobileNumber,
          birthDate: data.birthDate,
          address: data.address,
          password: data.password,
          role: "user",
        },
      };

      await db.put(params).promise();

      return params.Item;
    } catch (error) {
      console.log(error);
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async findById(userId) {
    const params = {
      TableName: this.tableName,
      Key: {
        _id: userId,
      },
    };

    return await db.get(params).promise();
  }

  async findByEmail(email) {
    const params = {
      TableName: this.tableName,
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    return await db.scan(params).promise();
  }

  async findByIdAndUpdate(userId, data) {
    const params = {
      TableName: this.tableName,
      Key: {
        _id: userId,
      },
      UpdateExpression: "",
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
      ReturnValues: `UPDATED_NEW`,
    };

    const updateExpressionParts = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    Object.keys(data).forEach((key, index) => {
      const attributeName = `#attrName${index}`;
      const attributeValueKey = `:attrValue${index}`;
      const attributeValue = data[key];
      updateExpressionParts.push(`${attributeName} = ${attributeValueKey}`);
      expressionAttributeNames[attributeName] = key;
      expressionAttributeValues[attributeValueKey] = attributeValue;
    });

    params.UpdateExpression = `SET ${updateExpressionParts.join(", ")}`;
    params.ExpressionAttributeNames = expressionAttributeNames;
    params.ExpressionAttributeValues = expressionAttributeValues;

    const update = await db.update(params).promise();

    return update.Attributes;
  }

  async findByIdAndDelete(userId) {
    const params = {
      TableName: this.tableName,
      Key: {
        _id: userId,
      },
    };

    return await db.delete(params).promise();
  }
}

module.exports = new UserRepository();

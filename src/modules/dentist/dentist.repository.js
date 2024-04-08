const db = require("../../core/db");
const dentistDbSchema = require("./dentist.schema");
const { v4: uuidv4 } = require("uuid");

class UserRepository {
  constructor() {
    this.tableName = dentistDbSchema.TableName;
  }

  async create(data) {
    const params = {
      TableName: this.tableName,
      Item: {
        _id: uuidv4(),
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        mobileNumber: data.mobileNumber,
        birthDate: data.birthDate,
        specialization: data.specialization,
        clinicAddress: data.clinicAddress,
        password: data.password,
        role: "dentist",
      },
    };

    await db.put(params).promise();

    return params.Item;
  }

  async findById(dentistId) {
    const params = {
      TableName: this.tableName,
      Key: {
        _id: dentistId,
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

  async findByIdAndUpdate(dentistId, data) {
    const params = {
      TableName: this.tableName,
      Key: {
        _id: dentistId,
      },
      UpdateExpression: "",
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
      ReturnValues: `UPDATED_NEW`,
    };

    const updateExpressionParts = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    console.log(data);

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

    console.log(params);

    const update = await db.update(params).promise();

    return update.Attributes;
  }

  async findByIdAndDelete(dentistId) {
    const params = {
      TableName: this.tableName,
      Key: {
        _id: dentistId,
      },
    };

    return await db.delete(params).promise();
  }
}

module.exports = new UserRepository();

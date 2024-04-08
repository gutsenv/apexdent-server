const db = require("../../core/db");
const appointmentDbSchema = require("./appointment.schema");
const { v4: uuidv4 } = require("uuid");

class AppointmentRepository {
  constructor() {
    this.tableName = appointmentDbSchema.TableName;
  }

  async create(data) {
    const params = {
      TableName: this.tableName,
      Item: {
        _id: uuidv4(),
        patient: data.patient,
        dentist: data.dentist,
        schedule: data.schedule,
        status: data.status || "pending",
      },
    };

    await db.put(params).promise();

    return params.Item;
  }

  async findByPatientId(patientId) {
    const params = {
      TableName: this.tableName,
      FilterExpression: "patient = :patient",
      ExpressionAttributeValues: {
        ":patient": patientId,
      },
    };

    const data = await db.scan(params).promise();

    return data;
  }

  async findById(appointmentId) {
    const params = {
      TableName: this.tableName,
      Key: {
        _id: appointmentId,
      },
    };

    return await db.get(params).promise();
  }

  async findByIdAndUpdate(appointmentId, data) {
    const params = {
      TableName: this.tableName,
      Key: {
        _id: appointmentId,
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

  async findByIdAndCancel(appointmentId) {
    const params = {
      TableName: this.tableName,
      Key: {
        _id: appointmentId,
      },
      UpdateExpression: "SET #attrName0 = :attrValue0",
      ExpressionAttributeNames: { "#attrName0": "status" },
      ExpressionAttributeValues: { ":attrValue0": "Cancelled" },
      ReturnValues: `UPDATED_NEW`,
    };

    return await db.update(params).promise();
  }
}

module.exports = new AppointmentRepository();

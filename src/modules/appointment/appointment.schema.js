const appointmentDBSchema = {
  TableName: "Appointments",
  KeySchema: [{ AttributeName: "_id", KeyType: "HASH" }],
  AttributeDefinitions: [
    { AttributeName: "patient", AttributeType: "S" },
    { AttributeName: "dentist", AttributeType: "S" },
    { AttributeName: "date", AttributeType: "S" },
    { AttributeName: "schedule", AttributeType: "S" },
    { AttributeName: "status", AttributeType: "S" },
  ],
};

module.exports = appointmentDBSchema;

const dentistDBSchema = {
  TableName: "Dentists",
  KeySchema: [{ AttributeName: "_id", KeyType: "HASH" }],
  AttributeDefinitions: [
    { AttributeName: "firstName", AttributeType: "S" },
    { AttributeName: "middleName", AttributeType: "S" },
    { AttributeName: "lastName", AttributeType: "S" },
    { AttributeName: "username", AttributeType: "S" },
    { AttributeName: "email", AttributeType: "S" },
    { AttributeName: "mobileNumber", AttributeType: "S" },
    { AttributeName: "birthDate", AttributeType: "S" },
    { AttributeName: "specialization", AttributeType: "S" },
    { AttributeName: "password", AttributeType: "S" },
    { AttributeName: "role", AttributeType: "S" },
  ],
};

module.exports = dentistDBSchema;
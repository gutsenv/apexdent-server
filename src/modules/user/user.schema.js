const userDBSchema = {
  TableName: "Users",
  KeySchema: [{ AttributeName: "_id", KeyType: "HASH" }],
  AttributeDefinitions: [
    { AttributeName: "firstName", AttributeType: "S", required: true },
    { AttributeName: "middleName", AttributeType: "S", required: false },
    { AttributeName: "lastName", AttributeType: "S", required: true },
    { AttributeName: "username", AttributeType: "S", required: true },
    { AttributeName: "email", AttributeType: "S", required: true },
    { AttributeName: "mobileNumber", AttributeType: "S", required: true },
    { AttributeName: "birthDate", AttributeType: "S", required: true },
    { AttributeName: "address", AttributeType: "S", required: true },
    { AttributeName: "password", AttributeType: "S", required: true },
    { AttributeName: "confirmPassword", AttributeType: "S", required: true },
    { AttributeName: "role", AttributeType: "S", required: false },
  ],
};

module.exports = userDBSchema;

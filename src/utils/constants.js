const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
  MISSING_FIELDS: "Required fields are missing.",
  EMAIL_ALREADY_IN_USE: "Email already in use.",
  INTERNAL_SERVER_ERROR: "Internal Server Error.",
};

module.exports = { HTTP_STATUS_CODES, ERROR_MESSAGES };

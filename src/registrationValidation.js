const { body, validationResult, checkSchema } = require("express-validator");

const registrationSchema = {
  username: {
    custom: {
      options: (value) => {
        return User.find({
          username: value,
        }).then((user) => {
          if (user.length > 0) {
            return Promise.reject("Username already in use");
          }
        });
      },
    },
  },
  gender: {
    notEmpty: true,
    errorMessage: "Gender field cannot be empty",
  },
  password: {
    isStrongPassword: {
      minLength: 6,
      minLowerCase: 1,
      minUpperCase: 1,
      minNumbers: 1,
    },
    errorMessage:
      "Password must be greater than 6 and contain at least 1 lowerCase, 1 upperCase and 1 number",
  },
  phone: {
    notEmpty: true,
    errorMessage: "Phone number cannot be empty",
  },
  email: {
    normalizeEmail: true,
    custom: {
      options: (value) => {
        return User.find({
          email: value,
        }).then((user) => {
          if (user.length > 0) {
            return Promise.reject("Email address is taken");
          }
        });
      },
    },
  },
};

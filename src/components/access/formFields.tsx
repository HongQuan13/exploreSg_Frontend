const loginFields = [
  {
    labelText: "Email address",
    id: "email",
    name: "email",
    type: "email",
    isRequired: true,
    placeholder: "Email address",
    errorMessage: "It should be a valid email address!",
    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
  },
  {
    labelText: "Password",
    id: "password",
    name: "password",
    type: "password",
    isRequired: true,
    placeholder: "Password",
    errorMessage: "Please enter a valid password!",
    pattern:
      "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
  },
];

const registerFields = [
  {
    labelText: "Username",
    id: "username",
    name: "username",
    type: "text",
    isRequired: true,
    placeholder: "Username",
    errorMessage:
      "Username should be 3-16 characters and shouldn't include any special characters!",
    pattern: "^[a-zA-Z0-9_]{3,16}$",
  },
  {
    labelText: "Email address",
    id: "email",
    name: "email",
    type: "email",
    isRequired: true,
    placeholder: "Email address",
    errorMessage: "It should be a valid email address!",
    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
  },
  {
    labelText: "Password",
    id: "password",
    name: "password",
    type: "password",
    isRequired: true,
    placeholder: "Password",
    errorMessage:
      "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
    pattern:
      "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
  },
  {
    labelText: "Confirm Password",
    id: "confirm-password",
    name: "confirm-password",
    type: "password",
    isRequired: true,
    placeholder: "Confirm Password",
    errorMessage: "Password don't match!",
    pattern:
      "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
  },
];

export { loginFields, registerFields };

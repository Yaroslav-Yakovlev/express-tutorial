export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: 'Username must be at least 5-32 characters',
    },
    notEmpty: {
      errorMessage: 'Username cannot be empty',
    },
    isString: {
      errorMessage: 'Username cannot be a string',
    },
  },
  displayName: {
    notEmpty: true,
  },
};
//
// export const getUsersValidationSchema = {
//   filter: {
//     in: 'query',
//     isString: {
//       errorMessage: 'Filter must be a string',
//     },
//     notEmpty: {
//       errorMessage: 'Filter cannot be empty',
//     },
//     isLength: {
//       options: {
//         min: 3,
//         max: 10,
//       },
//       errorMessage: 'Filter must be between 3 and 10 characters',
//     },
//   },
// };

const { createUser, authorize } = require("../../services/auth/cognitoAuth");

/** Register user */
module.exports.registerUser = async (event, context, callback) => {
  /** Get request body */
  const data = JSON.parse(event.body);
  /** Create user */
  const createUserResponse = await createUser(data.email, data.password);
  if(createUserResponse.status == 200) {
    /** Build response */
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Registration Successful'
        })
    }
    callback(null, response);
  } else {
    const response = {
      statusCode: 500,
      body: JSON.stringify({
          message: 'Something went wrong'
      })
  }
    callback(null, response);
  }
}

/** Login user */
module.exports.loginUser = async (event, context, callback) => {
  /** Get request body */
  const data = JSON.parse(event.body);
  /** Authorize user */
  const authResponse = await authorize(data.email, data.password);
  if(authResponse.status == 200) {
    /** Build response */
    const response = {
      statusCode: 200,
      body: JSON.stringify({
          message: 'Login successful',
          data: authResponse.data,
      })
    }
    callback(null, response);
  } else {
    /** Build response */
    const response = {
      statusCode: 500,
      body: JSON.stringify({
          message: 'Something went wrong',
      })
    }
    callback(null, response);
  }
}
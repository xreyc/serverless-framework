const AWS = require('aws-sdk');

/** Initialize cognito identity service provider */
const cognito = new AWS.CognitoIdentityServiceProvider();

/** Get cognito credentials */
const poolData = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_CLIENT_ID,
};

/** Create User */
async function createUser(email, password) {
    try {
        /** Create user */
        const params = {
            UserPoolId: poolData.UserPoolId,
            Username: email,
            UserAttributes: [{
                Name: 'email',
                Value: email
            },
            {
                Name: 'email_verified',
                Value: 'true'
            },
            {
                Name: 'custom:user_type',
                Value: 'registered'
            }
            ],
            MessageAction: 'SUPPRESS'
        }
        const createUserResponse = await cognito.adminCreateUser(params).promise();
    
        /** Set user password */
        if (createUserResponse.User) {
            const paramsForSetPass = {
            Password: password,
            UserPoolId: poolData.UserPoolId,
            Username: email,
            Permanent: true
            };
            await cognito.adminSetUserPassword(paramsForSetPass).promise()
        }

        return {
            status: 200,
            message: "Successfully created"
        }
    } catch(err) {
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}


/** Authorize */
async function authorize(email, password) {
    try {
        /** Authenticate user */
        const params = {
            AuthFlow: "ADMIN_NO_SRP_AUTH",
            UserPoolId: poolData.UserPoolId,
            ClientId: poolData.ClientId,
            AuthParameters: {
            USERNAME: email,
            PASSWORD: password
            }
        }
        const authResponse = await cognito.adminInitiateAuth(params).promise();
    
        /** Get user information */
        const userAttributes = await cognito.getUser({
            AccessToken: authResponse.AuthenticationResult.AccessToken,
        }).promise();

        return {
            status: 200,
            message: "Successful",
            data: {
                authResponse,
                userAttributes
            }
        }
    } catch(err) {
        return {
            status: 500,
            message: "Something went wrong"
        }
    }
}

module.exports = {
    createUser: createUser,
    authorize: authorize
}
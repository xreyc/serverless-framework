module.exports.authorize = (event, context, callback) => {
    // Get the token
    const token = event.authorizationToken;
    // Get the resource arn
    const resourceArn = event.methodArn;
    // Validate token
    if(token == 'mAOKV3qigt7DYLAE199Xx1eDjZz6yaMkK5BrowfQwzf8tu365Q4F2vCTPgSb10pU') {
      callback(null, {
        "policyDocument": {
            "Version": "2012-10-17",
            "Statement": [
              {
                "Action": "execute-api:Invoke",
                "Effect": "Allow",
                // This arn is api gateway method arn
                "Resource": resourceArn
              }
            ]
        }
    });
    } else {
        callback(null, {    
          "policyDocument": {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Action": "execute-api:Invoke",
                  "Effect": "Deny",
                  // This arn is api gateway method arn
                  "Resource": resourceArn
                }
              ]
          }
      });
    }
};

/**
EVENT DATA: 
{
  "type": "TOKEN",
  "methodArn": "arn:aws:execute-api:region:account-id:api-id/stage/method/HTTPVerb/resource-path",
  "authorizationToken": "Bearer your-auth-token",
  "resource": "/resource-path",
  "httpMethod": "HTTPVerb",
  "requestContext": {
    "accountId": "account-id",
    "resourceId": "resource-id",
    "stage": "stage",
    "requestId": "request-id",
    "identity": {
      "cognitoIdentityPoolId": null,
      "accountId": null,
      "cognitoIdentityId": null,
      "caller": null,
      "sourceIp": "source-ip",
      "principalOrgId": null,
      "accessKey": null,
      "cognitoAuthenticationType": null,
      "cognitoAuthenticationProvider": null,
      "userArn": null,
      "userAgent": "user-agent",
      "user": null
    },
    "resourcePath": "/resource-path",
    "httpMethod": "HTTPVerb",
    "extendedRequestId": "extended-request-id",
    "apiId": "api-id"
  },
  "headers": {
    "Authorization": "Bearer your-auth-token",
    "X-Custom-Header": "custom-value",
    "Other-Header": "other-value"
  }
}
*/
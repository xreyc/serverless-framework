	/** Get test */
  module.exports.getProducts = (event, context, callback) => {
    /** This is where we get all the query params, header, body and more */
    console.log(event);
  
    const response = {
      statusCode: 200,
      headers: {
        'x-custom-header': 'My Header Value',
      },
      body: JSON.stringify({
        message: 'THIS IS GET',
        eventData: event
      }),
    };
    callback(null, response);
};

/** Post test */
module.exports.createTest = (event, context, callback) => {
  console.log(event);

  const response = {
    statusCode: 200,
    headers: {
      'x-custom-header': 'My Header Value',
    },
    body: JSON.stringify({
      message: 'THIS IS POST',
      eventData: event
    }),
  }
  callback(null, response);
}
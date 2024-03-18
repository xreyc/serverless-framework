module.exports.sqsQueue1Handler = (event, context, callback) => {
    console.log("EVENT IS TRIGGERED");
    console.log(event);

    /** Send Success if processing is completed */
    callback(null, 200);
    // return {
    //     statusCode: 200,
    //     body: JSON.stringify("Processing completed"),
    // }
};
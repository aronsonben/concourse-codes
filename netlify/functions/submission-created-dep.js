exports.handler = async function (event, context) {
  console.log("submission-created...");

  const { payload } = JSON.parse(event.body);
  
  // Access submitted data
  const { data } = payload;
  console.log('New form submission received:', data);

  // Example: Send to another API (e.g., Notion, Slack, Database)
  try {
    // Your logic here
    
    // Redirect to success page
    return {
      statusCode: 302,
      headers: {
        Location: '/success.html'
      },
      body: ''
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
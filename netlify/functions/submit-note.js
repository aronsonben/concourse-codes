exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { note, password } = JSON.parse(event.body);
    
    // Validate password
    const COMMIT_PASSWORD = process.env.COMMIT_BOARD_PASSWORD;
    
    if (!COMMIT_PASSWORD) {
      console.error('COMMIT_BOARD_PASSWORD environment variable not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }
    
    if (password !== COMMIT_PASSWORD) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ error: 'Invalid password' })
      };
    }
    
    // Validate note
    if (!note || note.trim().length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Note cannot be empty' })
      };
    }
    
    if (note.length > 160) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Note exceeds 160 characters' })
      };
    }
    
    // Submit to Netlify Forms
    const SITE_ID = process.env.SITE_ID;
    const NETLIFY_API_TOKEN = process.env.NETLIFY_API_TOKEN;
    
    if (!NETLIFY_API_TOKEN || !SITE_ID) {
      console.error('Missing Netlify API credentials');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }
    
    // Create form submission via Netlify API
    const formSubmission = {
      data: {
        note: note.trim()
      }
    };
    
    const response = await fetch(
      `https://api.netlify.com/api/v1/sites/${SITE_ID}/submissions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NETLIFY_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          form_name: 'commit-board',
          ...formSubmission
        })
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Netlify API error:', errorText);
      throw new Error(`Netlify API request failed: ${response.status}`);
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        message: 'Note committed successfully'
      })
    };

  } catch (error) {
    console.error('Error submitting note:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to submit note',
        details: error.message 
      })
    };
  }
};

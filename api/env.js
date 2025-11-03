// Vercel Serverless Function to expose environment variables to the client
export default async function handler(req, res) {
  // Set CORS headers to allow client-side access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  // Return Airtable configuration from Vercel environment variables
  res.json({
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY || '',
    AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID || 'appJ4MLPYJyuWWBG8'
  });
}


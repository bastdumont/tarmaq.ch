// Vercel serverless function to provide environment variables to the frontend
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Return environment variables as JavaScript
  const envScript = `
window.AIRTABLE_API_KEY = '${process.env.AIRTABLE_API_KEY || ''}';
window.AIRTABLE_BASE_ID = '${process.env.AIRTABLE_BASE_ID || ''}';
window.ENVIRONMENT = '${process.env.NODE_ENV || 'production'}';

// Also set ENV object for compatibility
window.ENV = {
  AIRTABLE_API_KEY: window.AIRTABLE_API_KEY,
  AIRTABLE_BASE_ID: window.AIRTABLE_BASE_ID,
  ENVIRONMENT: window.ENVIRONMENT
};

console.log('Environment variables loaded from Vercel');
`;

  // Set content type to JavaScript
  res.setHeader('Content-Type', 'application/javascript');
  res.status(200).send(envScript);
}

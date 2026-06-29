const API_URL = 'https://script.google.com/macros/s/AKfycbzbC8JAmCRvPF39HQ5VuVidOXj3lbOo6Xelf4J5Xv66ifq_rukeZRRrrt8L06-WyTZP/exec';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const url = new URL(API_URL);
    
    if (req.method === 'GET' && req.query) {
      Object.keys(req.query).forEach(key => {
        if (req.query[key] !== undefined) {
          url.searchParams.append(key, req.query[key]);
        }
      });
    }

    const fetchOptions = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (req.method === 'POST' && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(url.toString(), fetchOptions);
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'خطأ في الاتصال بالخادم: ' + error.message 
    });
  }
}

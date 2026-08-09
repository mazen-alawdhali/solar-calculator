import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  try {
    // زيادة العداد مباشرة من قاعدة البيانات وحفظه فيها
    const count = await kv.incr('visitor_count');
    
    return response.status(200).json({ count: count });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}

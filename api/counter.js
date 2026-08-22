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
    // قراءة اسم التطبيق من الرابط
    const appName = request.query.app;
    
    // إذا لم يحدد تطبيق، يستخدم المفتاح القديم للحاسبة الذكية، وإلا يستحدث مفتاحاً مخصصاً
    const key = appName ? `visitor_count_${appName}` : 'visitor_count';

    // زيادة العداد الخاص بالتطبيق المحدد
    const count = await kv.incr(key);
    
    return response.status(200).json({ count: count, visits: count });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}

import { kv } from '@vercel/kv';

export default async function handler(request, response) {
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Access-Control-Allow-Origin', '*');
    
    if (request.method === 'OPTIONS') {
        return response.status(200).end();
    }

    try {
        const currentCount = await kv.incr('visitor_count');
        const baseline = 13500; 
        const totalCount = baseline + currentCount;

        return response.status(200).json({ count: totalCount });
    } catch (error) {
        return response.status(500).json({ error: 'Failed to fetch counter' });
    }
}


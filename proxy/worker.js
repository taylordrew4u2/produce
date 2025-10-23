// Cloudflare Worker: Blomp WebDAV proxy
export default {
  async fetch(req, env) {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'content-type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
      });
    }

    // Only accept POST
    if (req.method !== 'POST') {
      return json({ ok: false, error: 'Use POST method' }, 405);
    }

    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch {
      return json({ ok: false, error: 'Invalid JSON body' }, 400);
    }

    const { method, url, contentType, bodyBase64, accept } = body || {};
    if (!method || !url) {
      return json({ ok: false, error: 'method and url required' }, 400);
    }

    // Validate URL - only allow Blomp WebDAV
    let targetUrl;
    try {
      targetUrl = new URL(url);
    } catch {
      return json({ ok: false, error: 'Invalid URL' }, 400);
    }

    const isAllowed = targetUrl.hostname.endsWith('.blomp.com') && 
                     targetUrl.pathname.startsWith('/webdav');
    if (!isAllowed) {
      return json({ ok: false, error: 'Only Blomp WebDAV URLs allowed' }, 403);
    }

    // Build headers for upstream request
    const headers = new Headers();
    
    // Add Basic Auth from environment secrets
    if (env.BLOMP_USER && env.BLOMP_PASS) {
      const auth = btoa(`${env.BLOMP_USER}:${env.BLOMP_PASS}`);
      headers.set('Authorization', `Basic ${auth}`);
    }
    
    if (contentType) headers.set('Content-Type', contentType);
    if (accept) headers.set('Accept', accept);

    // Decode body for PUT requests
    let upstreamBody;
    if (method === 'PUT') {
      if (!bodyBase64) {
        return json({ ok: false, error: 'bodyBase64 required for PUT' }, 400);
      }
      try {
        upstreamBody = Uint8Array.from(atob(bodyBase64), c => c.charCodeAt(0));
      } catch {
        return json({ ok: false, error: 'Invalid base64 body' }, 400);
      }
    }

    // Make upstream request to Blomp
    try {
      const res = await fetch(url, {
        method,
        headers,
        body: upstreamBody,
      });

      // Build response payload
      const payload = {
        ok: res.ok,
        status: res.status,
        statusText: res.statusText,
      };

      // For GET requests, include response body
      if (method === 'GET' && res.ok) {
        try {
          payload.body = await res.text();
        } catch {
          payload.body = '';
        }
      }

      return json(payload, 200);
    } catch (error) {
      return json({
        ok: false,
        error: error.message || 'Upstream request failed',
      }, 502);
    }

    // Helper function to return JSON with CORS
    function json(obj, status = 200) {
      return new Response(JSON.stringify(obj), {
        status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};

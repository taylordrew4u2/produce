# Blomp WebDAV Proxy

Cloudflare Worker that proxies Blomp WebDAV requests with authentication.

## Deploy

```bash
cd proxy

# Install wrangler if needed
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Set your Blomp credentials as secrets
wrangler secret put BLOMP_USER
# Enter your Blomp email when prompted

wrangler secret put BLOMP_PASS
# Enter your Blomp password when prompted

# Deploy
wrangler deploy
```

After deployment, copy the Worker URL (e.g., `https://blomp-proxy.YOUR-SUBDOMAIN.workers.dev`) and paste it in the app's Configure dialog.

## Test

```bash
curl -X POST https://YOUR-WORKER.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"method":"GET","url":"https://beta.blomp.com/webdav/"}'
```

Should return JSON with `status: 200` or similar.

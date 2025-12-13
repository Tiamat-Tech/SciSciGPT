# Release Notes

## Bring-Your-Own-Key access controls
- Added settings experience to save or remove an Anthropic API key with secure KV storage and masking.
- Added daily free-question quota enforcement with `/api/quota` so signed-in users without a key are rate limited.
- Introduced chat-level prompts to add a key (and a settings page) so users can lift limits themselves.

## Backend LLM loader & dependency stability
- New `backend/llms.py` loader lets each request use a provided Anthropic key or fall back to Vertex AI defaults.
- Agents and tools now pull models through the loader (instead of a global map) and use updated `.text` accessors.
- Pinned LangChain/Anthropic dependency versions to known-compatible releases for reproducible deployments.

## Cleanup and security
- Removed demo stock components/assets and refreshed favicons/header branding.
- Ensured only example credentials remain in-repo; removed stray .env/service-account files from the tree.

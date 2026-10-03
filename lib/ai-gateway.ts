import Anthropic from "@anthropic-ai/sdk";
import { getVercelOidcToken } from "@vercel/oidc";

/** Vercel AI Gateway speaks the Anthropic Messages API at this base URL. */
export const AI_GATEWAY_BASE_URL = "https://ai-gateway.vercel.sh";

/**
 * Anthropic SDK client routed through Vercel AI Gateway.
 *
 * Uses AI_GATEWAY_API_KEY when set (local dev, or non-Vercel hosting). On Vercel
 * deployments it falls back to the project's OIDC token, so no key is needed.
 * OIDC tokens expire, so build a fresh client per request.
 * Returns null when neither credential is available.
 */
export async function getGatewayClient(): Promise<Anthropic | null> {
  const apiKey = process.env.AI_GATEWAY_API_KEY;
  if (apiKey) {
    return new Anthropic({ apiKey, baseURL: AI_GATEWAY_BASE_URL });
  }
  const oidcToken = await getVercelOidcToken().catch(() => null);
  if (oidcToken) {
    return new Anthropic({ apiKey: null, authToken: oidcToken, baseURL: AI_GATEWAY_BASE_URL });
  }
  return null;
}

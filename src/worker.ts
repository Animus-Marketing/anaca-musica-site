export default {
  async fetch(request: Request, env: { ASSETS: { fetch: typeof fetch } }) {
    const response = await env.ASSETS.fetch(request);
    const url = new URL(request.url);

    if (url.hostname !== 'anacamusica.com.br') {
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return newResponse;
    }

    return response;
  },
};

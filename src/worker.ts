export default {
  async fetch(request: Request, env: { ASSETS: { fetch: typeof fetch } }) {
    // ASSETS.fetch pode lançar exceção em requests fora do padrão
    // (ex.: bots pedindo /.well-known/traffic-advice) — devolve 404 em vez de 500
    let response: Response;
    try {
      response = await env.ASSETS.fetch(request);
    } catch {
      return new Response('Not Found', { status: 404 });
    }

    const url = new URL(request.url);

    if (url.hostname !== 'anacamusica.com.br') {
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return newResponse;
    }

    return response;
  },
};

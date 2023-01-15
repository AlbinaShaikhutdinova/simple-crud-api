import http from 'http';
export async function parseBody(req: http.IncomingMessage) {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (chunk) => (body += chunk));
      req.on('end', () => resolve(JSON.parse(body)));
    } catch (e) {
      return reject(e);
    }
  });
}

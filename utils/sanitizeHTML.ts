import sanitizeHtml from 'sanitize-html';

export function sanitizeHTML(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
    allowedAttributes: {
      'a': [ 'href' ]
    },
    allowedIframeHostnames: ['www.youtube.com']
  });
}
export default async function (markdown: string): Promise<string> {
  const [{ marked }, { default: DOMPurify }] = await Promise.all([
    import('marked'),
    import('dompurify'),
  ])

  marked.use({
    renderer: {
      link: ({ href, text }) => {
        return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
      }
    }
  })

  return DOMPurify.sanitize(await marked(markdown), {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'a'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  })
}

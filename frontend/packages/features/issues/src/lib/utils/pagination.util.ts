export function parseLinkHeader(header: string): boolean {
  if (!header) return false;

  const links = header.split(',');
  const lastLink = links.find(link => link.includes('rel="last"'));

  if (!lastLink) return true;

  return false;
}
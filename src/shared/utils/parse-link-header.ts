export function parseLinkHeader(header: string): { [rel: string]: string } {
  const links: Record<string, string> = {};
  if (!header) return links;

  const parts = header.split(',');

  for (const part of parts) {
    const section = part.split(';');
    if (section.length !== 2) continue;

    const url = section[0].trim().replace(/<(.*)>/, '$1');
    const rel = section[1].trim().replace(/rel="(.*)"/, '$1');

    links[rel] = url;
  }

  return links;
}

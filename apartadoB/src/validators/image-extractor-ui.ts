export class ImageExtractor {
  static extractImageUrl(html: string): string | null {
    const imgRegex = /<img[^>]+src=["']([^"'>]+)["']/;
    const match = html.match(imgRegex);
    return match ? match[1] : null;
  }

  static extractAllImageUrls(html: string): string[] {
    const imgRegex = /<img[^>]+src=["']([^"'>]+)["']/g;
    const matches = Array.from(html.matchAll(imgRegex));
    return matches.map((match) => match[1]);
  }
}

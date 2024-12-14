import { ImageExtractor } from './validators/image-extractor-ui';

class ImageExtractorUI {
  private input: HTMLInputElement;
  private extractButton: HTMLButtonElement;
  private resultSpan: HTMLElement;

  constructor() {
    this.input = document.getElementById("url") as HTMLInputElement;
    this.extractButton = document.getElementById("buttonUrl") as HTMLButtonElement;
    this.resultSpan = document.getElementById("ulr-direction") as HTMLElement;

    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    this.extractButton.addEventListener("click", () => {
      this.extractAndDisplayUrls();
    });
  }

  private extractAndDisplayUrls(): void {
    const html = this.input.value.trim();
    
    if (!html) {
      this.resultSpan.textContent = "Por favor, introduce contenido HTML";
      return;
    }

    const urls = ImageExtractor.extractAllImageUrls(html);

    if (urls.length > 0) {
      // Crear links clickeables para cada URL encontrada
      this.resultSpan.innerHTML = urls
        .map((url: string) => `<a href="${url}" target="_blank">${url}</a>`)
        .join('<br>');
    } else {
      this.resultSpan.textContent = "No se encontraron imágenes en el HTML proporcionado";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ImageExtractorUI();
});
import { ImageExtractor } from "../validators/image-extractor-ui";

describe("ImageExtractor", () => {
  // Tests para extractImageUrl
  describe("extractImageUrl", () => {
    it("debería extraer la URL de una imagen simple", () => {
      // Arrange
      const html = '<img src="foto.jpg">';
      // Act
      const result = ImageExtractor.extractImageUrl(html);
      // Assert
      expect(result).toBe("foto.jpg");
    });

    it("debería retornar null si no hay imagen", () => {
      const html = '<div>No hay imagen</div>';
      const result = ImageExtractor.extractImageUrl(html);
      expect(result).toBeNull();
    });

    it("debería manejar comillas simples", () => {
      const html = "<img src='foto.jpg'>";
      const result = ImageExtractor.extractImageUrl(html);
      expect(result).toBe("foto.jpg");
    });

    it("debería extraer la primera URL si hay múltiples imágenes", () => {
      const html = '<img src="foto1.jpg"><img src="foto2.jpg">';
      const result = ImageExtractor.extractImageUrl(html);
      expect(result).toBe("foto1.jpg");
    });
  });

  // Tests para extractAllImageUrls
  describe("extractAllImageUrls", () => {
    it("debería extraer todas las URLs de las imágenes", () => {
      const html = `
        <img src="foto1.jpg">
        <img src="foto2.jpg">
        <img src="foto3.jpg">
      `;
      const result = ImageExtractor.extractAllImageUrls(html);
      expect(result).toEqual(["foto1.jpg", "foto2.jpg", "foto3.jpg"]);
    });

    it("debería retornar un array vacío si no hay imágenes", () => {
      const html = '<div>No hay imágenes</div>';
      const result = ImageExtractor.extractAllImageUrls(html);
      expect(result).toEqual([]);
    });

    it("debería manejar diferentes tipos de comillas", () => {
      const html = '<img src="foto1.jpg"><img src=\'foto2.jpg\'>';
      const result = ImageExtractor.extractAllImageUrls(html);
      expect(result).toEqual(["foto1.jpg", "foto2.jpg"]);
    });

    it("debería extraer URLs de imágenes en HTML complejo", () => {
      const html = `
        <div class="container">
          <p><img src="foto1.jpg" alt="foto 1"></p>
          <div>
            <img src="foto2.jpg" class="clase">
          </div>
        </div>
      `;
      const result = ImageExtractor.extractAllImageUrls(html);
      expect(result).toEqual(["foto1.jpg", "foto2.jpg"]);
    });
  });
});
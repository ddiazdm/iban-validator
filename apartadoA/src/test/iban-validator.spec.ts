import { IbanValidator } from "../validators/iban-validator";

describe("IbanValidator", () => {
  const validIbans = [
    "ES66 2100 0418 40 1234567891",
    "ES6621000418401234567891",
    "ES66-2100-0418-40-1234567891",
  ];

  const invalidIbans = [
    "ES00 0000 0000 00 0000000000",
    "XX21 1465 0100 72 2030876293",
    "ES21 1465 0100 72",
  ];

  describe("validate", () => {
    it("should validate correct IBANs", () => {
      validIbans.forEach((iban) => {
        console.log(`Validando IBAN: ${iban}`);
        expect(IbanValidator.validate(iban)).toBe(true);
      });
    });

    it("should invalidate incorrect IBANs", () => {
      invalidIbans.forEach((iban) => {
        expect(IbanValidator.validate(iban)).toBe(false);
      });
    });

    it("should handle validation options", () => {
      const iban = validIbans[0];
      expect(IbanValidator.validate(iban)).toBe(true);
    });
  });

  describe("extractParts", () => {
    it("should correctly extract IBAN parts", () => {
      const parts = IbanValidator.extractParts(validIbans[0]);
      expect(parts).toEqual({
        countryCode: "ES",
        controlDigits: "66",
        bankCode: "2100",
        branchCode: "0418",
        controlDigit: "40",
        accountNumber: "1234567891",
      });
    });

    it("should return null for invalid IBAN", () => {
      const parts = IbanValidator.extractParts(invalidIbans[0]);
      expect(parts).toBeNull();
    });
  });
});

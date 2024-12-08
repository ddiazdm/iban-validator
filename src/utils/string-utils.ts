export const cleanIban = (iban: string): string => {
    return iban.replace(/[-\s]/g, "").toUpperCase();
  };
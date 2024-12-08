import { IbanParts, BankInfo } from "../models/types";
import { BANK_CODES } from "../constants/bank-codes";
import { cleanIban } from "../utils/string-utils";
import { ValidateIBANOptions, validateIBAN } from "ibantools";

export class IbanValidator {
    private static IBAN_REGEX = /^ES\d{2}\d{4}\d{4}\d{2}\d{10}$/;

    static options: ValidateIBANOptions = {
        allowQRIBAN: false, 
      }

    static validate(iban: string): boolean {
        try {
            const cleanedIban = cleanIban(iban);

            if (!this.IBAN_REGEX.test(cleanedIban)) {
                return false;
            }

            const validationResult = validateIBAN(cleanedIban, this.options);
            return validationResult.valid;

        } catch (error) {
            console.error('Error en validación:', error);
            return false;
        }
    }

    static extractParts(iban: string): IbanParts | null {
        const cleanedIban = cleanIban(iban);

        const parts: IbanParts = {
            countryCode: cleanedIban.slice(0, 2),
            controlDigits: cleanedIban.slice(2, 4),
            bankCode: cleanedIban.slice(4, 8),
            branchCode: cleanedIban.slice(8, 12),
            controlDigit: cleanedIban.slice(12, 14),
            accountNumber: cleanedIban.slice(14)
        };

        return this.validate(cleanedIban) ? parts : null;
    }

    static getBankInfo(bankCode: string): BankInfo | undefined {
        return BANK_CODES.find(bank => bank.code === bankCode);
    }
}
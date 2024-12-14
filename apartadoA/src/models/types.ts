export interface BankInfo {
  code: string;
  name: string;
}

export interface IbanParts {
  countryCode: string;
  controlDigits: string;
  bankCode: string;
  branchCode: string;
  controlDigit: string;
  accountNumber: string;
}

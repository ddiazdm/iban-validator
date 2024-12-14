import { IbanValidator } from './validators/iban-validator';

class IbanValidatorUI {
    private ibanInput: HTMLInputElement;
    private validateButton: HTMLButtonElement;
    private resultContainer: HTMLElement;
    private validationResult: HTMLElement;
    private ibanDetails: HTMLElement;
  
    constructor() {
      this.ibanInput = document.getElementById("iban") as HTMLInputElement;
      this.validateButton = document.getElementById("buttonIban") as HTMLButtonElement;
      this.resultContainer = document.getElementById("result") as HTMLElement;
      this.validationResult = document.getElementById("validation-result") as HTMLElement;
      this.ibanDetails = document.getElementById("iban-details") as HTMLElement;
  
      this.initializeEventListeners();
    }
  
    private initializeEventListeners(): void {
      this.validateButton.addEventListener("click", () => this.validateIban());
      this.ibanInput.addEventListener("input", (e: Event) => this.formatIbanInput(e));
    }
  
    private formatIbanInput(e: Event): void {
      const input = e.target as HTMLInputElement;
      let value = input.value.replace(/[^\dA-Z]/g, "");
      
      const groups = value.match(/.{1,4}/g);
      if (groups) {
        input.value = groups.join(" ");
      }
    }
  
    private validateIban(): void {
      const iban = this.ibanInput.value;
      const isValid = IbanValidator.validate(iban);
      
      this.resultContainer.classList.remove("hidden");
      this.validationResult.className = "validation-result " + (isValid ? "valid" : "invalid");
      
      if (isValid) {
        const parts = IbanValidator.extractParts(iban);
        if (parts) {
          const bankInfo = IbanValidator.getBankInfo(parts.bankCode);
          
          this.validationResult.textContent = "✅ IBAN válido";
          this.ibanDetails.classList.add("show");
          
          document.getElementById("country-code")!.textContent = parts.countryCode;
          document.getElementById("control-digits")!.textContent = parts.controlDigits;
          document.getElementById("bank-name")!.textContent = bankInfo?.name || "Desconocido";
          document.getElementById("branch-code")!.textContent = parts.branchCode;
          document.getElementById("account-control")!.textContent = parts.controlDigit;
          document.getElementById("account-number")!.textContent = parts.accountNumber;
        }
      } else {
        this.validationResult.textContent = "❌ IBAN inválido";
        this.ibanDetails.classList.remove("show");
      }
    }
  }
  
  new IbanValidatorUI();
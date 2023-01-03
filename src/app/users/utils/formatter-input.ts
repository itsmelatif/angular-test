export class FormatterInput {
  static numberOnly(formControlValue: string): string {
    return formControlValue.toString().trim().replace(/[a-zA-Z!"#$%&'()*+,\-.\/:;<>=?@\[\]{}\\^_`~]/gi, '')
  }

  static alphabetAndSpace(value: string): string {
    return value.replace(/[^A-Za-z\s]*$/g, '')
  }

  static limitInput(formControlValue: string, maxLength: number): string {
    if (formControlValue && formControlValue?.toString().length > maxLength) {
      return formControlValue.substring(0, maxLength);
    }
    return formControlValue;
  }

}


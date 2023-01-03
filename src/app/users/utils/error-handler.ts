import { AbstractControl, FormControl } from "@angular/forms";

export function getErrorValidation(formControl: AbstractControl | FormControl): string | null {
  let error = null;
  if (formControl.errors) {
    const firstKey = Object.keys(formControl.errors)[0];
    switch (firstKey) {
      case 'required':
        error = ' Field is required';
        break;
      case 'minlength':
        error = ' Min ' + formControl.errors['minlength'].requiredLength + ' character';
        break;
      case 'maxlength':
        error = ' Max ' + formControl.errors['maxlength'].requiredLength + ' character';
        break;
      default:
        error = formControl.errors[firstKey];
        break;
    }
  }
  return error
}

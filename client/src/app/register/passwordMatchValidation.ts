
import {FormControl, Validators, ValidatorFn, FormGroup, ValidationErrors, FormBuilder} from '@angular/forms';

// custom validator to check that two fields match
export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    if (formGroup.get('passwordControl').value === formGroup.get('CfpasswordControl').value)
      return null;
    else
      return {passwordMismatch: true};
  };
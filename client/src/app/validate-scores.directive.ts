import { Directive } from '@angular/core';
import {
  Validator,
  NG_VALIDATORS,
  AbstractControl,
  FormGroup,
} from '@angular/forms';

@Directive({
  selector: '[appValidateScores]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidateScoresDirective,
      multi: true,
    },
  ],
})
export class ValidateScoresDirective implements Validator {
  validate(control: FormGroup): { [key: string]: any } | null {
    const firstInput = control.get('first');
    const secondInput = control.get('second');

    if (firstInput && firstInput.valid && secondInput && secondInput.valid) {
      const score = +firstInput.value + +secondInput.value;

      if (score > 10) {
        return {
          score: 'invalid',
        };
      }
    }

    return null;
  }
}

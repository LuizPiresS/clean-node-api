import { CompareFieldsValidation } from '../../presentention/helpers/validators/compare-fields-validation'
import { RequiredFieldValidation } from '../../presentention/helpers/validators/required-field-validation'
import { Validation } from '../../presentention/helpers/validators/validation'
import { ValidationComposite } from '../../presentention/helpers/validators/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

  return new ValidationComposite(validations)
}

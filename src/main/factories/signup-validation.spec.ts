import { CompareFieldsValidation } from '../../presentention/helpers/validators/compare-fields-validation'
import { RequiredFieldValidation } from '../../presentention/helpers/validators/required-field-validation'
import { Validation } from '../../presentention/helpers/validators/validation'
import { ValidationComposite } from '../../presentention/helpers/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presentention/helpers/validators/validation-composite')

describe('SignUpValidation factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    expect(ValidationComposite).toHaveBeenLastCalledWith(validations)
  })
})

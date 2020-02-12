import { EmailValidation, RequiredFieldValidation, ValidationComposite, CompareFieldsValidation } from '../../../presentention/helpers/validators'
import { EmailValidator } from '../../../presentention/protocols/email-validator'
import { Validation } from '../../../presentention/protocols/validation'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../../presentention/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
describe('SignUpValidation factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenLastCalledWith(validations)
  })
})

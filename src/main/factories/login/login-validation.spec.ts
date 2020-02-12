import { EmailValidation } from '../../../presentention/helpers/validators/email-validation'
import { RequiredFieldValidation } from '../../../presentention/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../presentention/helpers/validators/validation-composite'
import { EmailValidator } from '../../../presentention/protocols/email-validator'
import { Validation } from '../../../presentention/protocols/validation'
import { makeLoginValidation } from './login-validation'

jest.mock('../../../presentention/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
describe('LoginValidation factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenLastCalledWith(validations)
  })
})

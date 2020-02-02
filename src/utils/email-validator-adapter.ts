import validator from 'validator'

import { EmailValidator } from '../presentention/protocols/email-validator'

export class EmailValidatorAdapter implements EmailValidator {
  public isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}

import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { Validation } from '../../helpers/validators/validation'
import { Controller, HttpRequest, HttpResponse, AddAccount } from './signup-protocols' // Protocolos genericos
export class SignUpController implements Controller {
  private readonly validation: Validation
  private readonly addAccount: AddAccount
  constructor (addAccount: AddAccount, validation: Validation) {
    this.validation = validation
    this.addAccount = addAccount
  }

  public async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      return ok(account)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}

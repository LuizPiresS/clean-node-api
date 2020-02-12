import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}
describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ any_field: 'any_data' })

    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return  if validation cuccess', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_data' })

    expect(error).toBeFalsy()
  })
})

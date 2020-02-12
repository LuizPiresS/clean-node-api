import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}

describe('RequiredField Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      any_field: 'any_data',
      fieldToCompare: 'wrong_data'
    })

    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return  if validation success', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_data',
      fieldToCompare: 'any_data'
    })

    expect(error).toBeFalsy()
  })
})

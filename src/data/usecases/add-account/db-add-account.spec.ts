import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

interface sutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    public async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}
const makeSut = (): sutTypes => {
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub)

  return {
    sut,
    encrypterStub
  }
}

describe('DbAddAccount  Usecase', () => {
  test('should call Encrypeter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_Password'
    }
    await sut.add(accountData)
    // Testa se o metodo encryptSpy foi chamdo usando o valor passado no cado "valid_Password"
    expect(encryptSpy).toHaveBeenCalledWith('valid_Password')
  })
})

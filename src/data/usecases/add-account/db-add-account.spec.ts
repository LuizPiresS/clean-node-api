import { DbAddAccount } from './db-add-account'
describe('DbAddAccount  Usecase', () => {
  test('should call Encrypeter with correct password', async () => {
    class EncrypterStub {
      public async encrypt (value: string): Promise<string> {
        return new Promise(resolve => resolve('hashed_password'))
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
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

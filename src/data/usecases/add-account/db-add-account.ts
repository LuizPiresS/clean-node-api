import { AddAccount, AddAccountModel, AccountModel, Encrypter, AddAccountRepository } from './db-add-account-protocols'
export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountReposytory: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountReposytory: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountReposytory = addAccountReposytory
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    await this.addAccountReposytory.add(Object.assign({}, accountData, { password: hashedPassword }))
    return new Promise(resolve => resolve(null))
  }
}

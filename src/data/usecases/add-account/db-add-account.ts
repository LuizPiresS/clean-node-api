import { AddAccount, AddAccountModel, AccountModel, Hasher, AddAccountRepository } from './db-add-account-protocols'
export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher
  private readonly addAccountReposytory: AddAccountRepository

  constructor (hasher: Hasher, addAccountReposytory: AddAccountRepository) {
    this.hasher = hasher
    this.addAccountReposytory = addAccountReposytory
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.addAccountReposytory.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}

import { AddAccount, AddAccountModel, AccountModel, Hasher, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account-protocols'
export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountReposytory: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.addAccountReposytory.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}

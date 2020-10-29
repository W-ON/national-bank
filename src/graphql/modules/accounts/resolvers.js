import Account from '../../../models/Account'


export default {
  Query: {
    accounts: () => Account.find(),
    account: (parent, {id}) => Account.getAccount(id),
    balance: (parent, {id}) => Account.getBalance(id)
  },
  Mutation: {
    createAccount: (parent, {data}) => Account.create(data),
    updateAccount: (parent, {id, data}) => Account.findOneAndUpdate(id, data, {new: true}),
    deleteAccount: async (parent, { id }) => await !!(Account.findOneAndDelete(id)),
    withdraw: async (parent, {accountId, amount}) => Account.withdraw(accountId, amount),
    deposit: (parent, {accountId, amount}) => Account.deposit(accountId, amount)
  }
}
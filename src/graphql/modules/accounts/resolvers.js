import Account from '../../../models/Account'
import mongoose from 'mongoose'


export default {
  Query: {
    accounts: () => Account.find(),
    account: (parent, {id}) => getAccount(id),
    balance: async (parent, {id}) => {
      const account = await getAccount(id)
      console.log(account)
      return { balance: account.balance}

    }
  },
  Mutation: {
    createAccount: (parent, {data}) => Account.create(data),
    updateAccount: (parent, {id, data}) => Account.findOneAndUpdate(id, data, {new: true}),
    deleteAccount: async (parent, { id }) => await !!(Account.findOneAndDelete(id)),
    withdraw: async (parent, {accountId, quantity}) => {
      const account = await getAccount(accountId)

      if (quantity > account.balance){
        throw new Error("Saldo Insuficiente!")
      }


      return newFunction(account, quantity, accountId)
     
        
    },
    deposit: async (parent, {accountId, quantity}) => {
      const account = await getAccount(accountId)
      const newBalance = account.balance + quantity
      return await Account.findOneAndUpdate(accountId, {balance: newBalance }, {new: true})

    }
  }
}

async function newFunction(account, quantity, accountId) {
  const newBalance = account.balance - quantity

  return await Account.findOneAndUpdate(accountId, { balance: newBalance }, { new: true })
}

async function getAccount(accountId) {
  if (!mongoose.isValidObjectId(accountId)) {
    throw new Error("AccountId Inválido!")
  }


  const account = await Account.findById(accountId)

  if (account == null) {
    throw new Error("Conta Inexistente!")
  }
  return account
}

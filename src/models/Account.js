import mongoose from 'mongoose'

function thisModel () {
  return mongoose.model('accounts')
}

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
})

Schema.statics.getAccount = async function(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new Error("account not found!")
  }

  const account = await thisModel().findById(id)

  if (account == null) {
    throw new Error("account not found!")
  }

  return account
}


Schema.statics.getBalance = async function(id) {
  const account = await this.getAccount(id)
  return { balance: account.balance }
}

Schema.statics.deposit = async function (accountId, amount) {
  const account = await this.getAccount(accountId)
  const newBalance = account.balance + amount
  return thisModel().findOneAndUpdate({_id: accountId}, { balance: newBalance }, {new: true})
}

Schema.statics.withdraw = async function (accountId, amount) {
  const account = await this.getAccount(accountId)

  if (amount > account.balance){
    throw new Error("Saldo Insuficiente!")
  }

  const newBalance = account.balance - amount

  return thisModel().findOneAndUpdate({_id: accountId}, { balance: newBalance }, {new: true})

}

export default mongoose.model('accounts', Schema)
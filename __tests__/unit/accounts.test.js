import Account  from '../../src/models/Account'
import mongo from '../../src/clients/mongoose'
import factory from '../factory'


beforeAll(async () => {
  await mongo.connectMongoose()
})


describe("Unit Test - Accounts", () => {
  const newAccount = factory.getAccount()


  it("--- CREATE A NEW ACCOUNT", async (done) => {
    const accountCreated = await Account.create(newAccount)

    expect(accountCreated.id).toBeDefined()
    expect(accountCreated.name).toBe(newAccount.name)
    expect(accountCreated.balance).toBe(newAccount.balance)

    newAccount.setId(accountCreated.id)
    done()
  }),

  it("--- QUERY A NEW ACCOUNT", async (done) => {
   const queryAccount = await Account.getAccount(newAccount.id)

   expect(queryAccount.id).toBe(newAccount.id)
   expect(queryAccount.name).toBe(newAccount.name)
   expect(queryAccount.amount).toBe(newAccount.amount)
   done()
  }),

  it("--- DEPOSIT", async (done) => {
    let amount = 1000
    let total = newAccount.balance + amount
    let accountUpdated = await Account.deposit(newAccount.id, amount)
    const queryAccount = await Account.getAccount(newAccount.id)

    expect(newAccount.id).toBe(accountUpdated.id)
    expect(newAccount.name).toBe(accountUpdated.name)
    expect(total).toBe(accountUpdated.balance)


    expect(queryAccount.id).toBe(newAccount.id)
    expect(queryAccount.name).toBe(newAccount.name)
    expect(queryAccount.balance).toBe(total)
    done()
   })

   it("--- WITHDRAW", async (done) => {
    let amount = 1000
    const queryAccountBefore = await Account.getAccount(newAccount.id)
    let total = queryAccountBefore.balance - amount
    let accountUpdated = await Account.withdraw(newAccount.id, amount)
    const queryAccountAfter = await Account.getAccount(newAccount.id)

    expect(newAccount.id).toBe(accountUpdated.id)
    expect(newAccount.name).toBe(accountUpdated.name)
    expect(total).toBe(accountUpdated.balance)


    expect(queryAccountAfter.id).toBe(newAccount.id)
    expect(queryAccountAfter.name).toBe(newAccount.name)
    expect(queryAccountAfter.balance).toBe(total)
    done()
   })

   it("--- WITHDRAW PASSING THE BALANCE", async (done) => {
    const queryAccountBefore = await Account.getAccount(newAccount.id)
    let amount = queryAccountBefore.balance * 2

    try {
    let accountUpdated = await Account.withdraw(newAccount.id, amount)
      expect(amount).toBeGreaterThan(queryAccountBefore.balance)
    } catch (error) {
      expect(error.toString()).toBe( new Error("Saldo Insuficiente!").toString())
    }
    done()

   })

   afterAll(async done => {
    await mongo.closeMongoose()
    done()
  });
});
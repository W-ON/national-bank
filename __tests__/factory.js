import faker from 'faker'
export default class Factory {
  static getAccount() { return new Account() }
}

class Account {
  constructor(){
    this.name = faker.name.findName()
    this.balance = faker.finance.amount(1000, 100000)
  }

  setId  (id) { this.id = id }

  static newName() { return faker.name.findName() };
}
"use strict";

const fs = require("fs");
const path = require("path");
const { expect } = require("chai");
const EasyGraphQLTester = require("easygraphql-tester");

const schemaCode = fs.readFileSync(
  path.join(__dirname, ".", "schema.gql"),
  "utf8"
);

const fixture = {
  "data": {
    "accounts": [
      {
        "_id": "5f9265fd447727532913d5bd",
        "firstName": "Willian",
        "lastName": "Novaes",
        "balance": 1000.91
      },
      {
        "_id": "5f926688447727532913d5be",
        "firstName": "Darth",
        "lastName": "Vader",
        "balance": 99999.999
      }
    ]
  }
}

describe("Test my schema, Query", () => {
  let tester;
  before(() => {
    tester = new EasyGraphQLTester(schemaCode);
  });

  describe("Queries", () => {
    it("accounts - Should pass with valid query", () => {
      const validQuery = `
      query {
        accounts {
          firstName,
          lastName,
          balance
        }
      }
      `
      tester.test(true, validQuery)
    });

    it("accounts - Should pass with the query is invalid", () => {
      const validQuery = `
      query {
        accounts {
          newField,
          firstName,
          lastName,
          balance
        }
      }
      `
      tester.test(false, validQuery)
    });

    
    it("account - Should pass with valid query", () => {
      const validQuery = `
      query {
        account(id: "5f9265fd447727532913d5bd") {
          firstName,
          lastName,
          balance
        }
      }
      `
      tester.test(true, validQuery)
    });

    it("account - Should pass with the query is invalid", () => {
      const validQuery = `
      query {
        account(id: asdasd, newField: 'a') {
          firstName,
          lastName,
          balance
        }
      }
      `
      tester.test(false, validQuery)
    });

  }),

    describe("Test my mutation", () => {


    it("create account with correct values", () => {

      const query = `
      query {
        accounts {
          firstName,
          lastName,
          balance
        }
      }
      `

      const mutation = `
      mutation CreateUser($input: AccountInput!) {
        createAccount(input: $input) {
          firstName,
          lastName,
          balance
        }
      }
    `

    const input = {
      input: {
        firstName: 'Bruce',
        lastName: 'Wayne',
        balance: 99999999999.99
      }
    }
    const response = tester.mock({query: mutation, variables: input, saveFixture: true})

    expect(response.data.createAccount.firstName).to.be.a('string')
    expect(response.data.createAccount.lastName).to.be.a('string')
    expect(response.data.createAccount.balance).to.be.a('number')

    });

    it("create account with incorrect values", () => {

      const query = `
      query {
        accounts {
          firstName,
          lastName,
          balance
        }
      }
      `
  
      const mutation = `
      mutation CreateUser($input: AccountInput!) {
        createAccount(input: $input) {
          firstName,
          lastName,
          balance
        }
      }
    `
  
    const input = {
      input: {
        firstName: null,
        lastName: null,
        balance: null
      }
    }
      const response = tester.mock({query: mutation, variables: input, saveFixture: true, mockErrors: true})
  
  
    });
  
    it("delete account with accountId exist", async () => {

  
      const mutation = `
      mutation deleteAccount($id: ID!) {
        deleteAccount(id: $id)
      }
    `
  
    const id = { id: "5f9265fd447727532913d5bd" }
    const response = await tester.mock({query: mutation, fixture, variables: id, })

  
    });

    it("delete account with accountId don't exist", () => {

  
      const mutation = `
      mutation deleteAccount($id: ID!) {
        deleteAccount(id: $id)
      }
    `
  
    const id = { id: "asdsadasd123231" }
    const response = tester.mock({query: mutation, fixture, variables: id,})

  
    });
  });
});

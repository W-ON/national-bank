# national-bank


##Primeiro use npm ou yarn script para montar o docker com mongoDB (Necessário ter o docker-compose instalado.
##Depois é só dar yarn dev e A API Irá funcionar.

Já existem duas contas no banco criadas.

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
    
    Para sacar dinheiro basta montar uma query como no exemplo a seguir:
mutation {
  withdraw(accountId: "5f9265fd447727532913d5bd", quantity: 10) {
    firstName,
    lastName,
    balance
  }
}

AccountId será o Id da conta e o quantity a quantidade a ser sacada.

Você obterá uma resposta assim. 
{
  "data": {
    "withdraw": {
      "firstName": "Willian",
      "lastName": "Novaes",
      "balance": 998.91
    }
  }
}

para depositar você precisará montar uma query dessa forma.
mutation {
  deposit(accountId: "5f9265fd447727532913d5bd", quantity: 1) {
    firstName,
    lastName,
    balance
  }
}
e obeterá essa resposta

{
  "data": {
    "deposit": {
      "firstName": "Willian",
      "lastName": "Novaes",
      "balance": 1002.91
    }
  }
}

e para consultar o saldo você precisa montar uma query dessa forma:

query {
  balance(id: "5f9265fd447727532913d5bd") {balance}
}

Aonde obterá essa resposta:
{
  "data": {
    "balance": {
      "balance": 1002.91
    }
  }
}

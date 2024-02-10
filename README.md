# World Wallet - Refactor ⚡

<br />

![image](https://github.com/bellacristsantos/world-wallet-refactor/blob/legacy-code-review/legacy-code-review/client/src/assets/dashboard.png)

<br />

[Code before refactor](https://github.com/diegoss-github/world-wallet)

<br />

## :bulb: Refactor Process
<br />

WorldWallet aims to allow global citizens to keep track of their finances with the option to have different bank accounts from various countries. The app splits accounts between balances and liabilities, and the total net worth is calculated and displayed with a global breakdown. To link bank accounts from different countries, the Plaid API was used, allowing data to be populated in the application and added to the net worth. Another feature is a default currency option that users can set to USD, Euros, or Pounds, updating all values in the application interface accordingly.

My role in this project involved refactoring the server to Typescript and creating tests for controllers. I established two types of folders: one for project type definitions using interfaces and another for external libraries' module declarations, such as Express and MongoDB sessions. For testing controllers, the goal was to address the interaction between various components of the system, including controllers, middleware, and an in-memory database. I created tests using Jest, made HTTP requests using Supertest, intercepted HTTP requests, and simulated responses using Nock. I also utilized an in-memory MongoDB server.

<br />

## :gear: Tech Stack
<br />


React, Typescript, Node.JS, Express, MongoDB, Mongoose, Plaid API, Jest, Nock, Supertest, and MongoMemoryServer.

<br />

## Getting started
<br />

### 1. Install dependencies
<br />

1) Requirements
  * Obtain MongoDB URI from MongoDB Atlas
  ```
      1.1 Go to the MongoDB Atlas website: https://account.mongodb.com/account/login
      1.2 Create a new project.
      1.3 Create a new cluster within the project.
      1.4 Start the cluster.
      1.5 Obtain the MongoDB URI from the cluster settings.
  ```

  * Get your PLAID CLIENT ID and PLAID SECRET, follow the instructions on their website: https://plaid.com/docs/quickstart/#how-it-works

2) Clone the repository
```
  git clone git@github.com:bellacristsantos/world-wallet-refactor.git

  * navigate to the project folder:
    cd code-reviews/legacy-code-review
```

3) Install dependencies
  * Client folder:
  ```
    npm install
  ```

  * Server folder:
  ```
    npm install
  ```

4) Configure your environment
```
  cd server/.env.example server/.env

  Edit server/.env
    # 1. PLAID_ENV sandbox is for test usage. Change to development to access real bank accounts.
    # 2. for SESSION_SECRET input a long unique string.
    # 3. Obtain a MongoDB URI from MongoDB Atlas and replace MONGODB_URI in server/.env with your URI.
```

5) Run the project
```
  * Starts the client
    npm run dev

  * Starts the server
    npm run dev
  ```

6) Run Tests
  Requirements
    * Ensure that MongoDB URI in server/.env is correctly configured.

    * Run Tests with Jest
        npx jest
  ```



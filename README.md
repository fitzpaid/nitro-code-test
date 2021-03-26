# Running the application

Download the repo, navigate to the top level and run the following.

1. Run `npm install` to get the necessary dependencies (might take a while with cypress)
2. Run `npm run startServer` to start up the express server for the api
3. Run `npm start` to start up the client

`npm start` should open a tab at `http://localhost:3000/` but if not, navigate there
now.

You can run unit tests with `npm test`

To run the integration test you can with `npm run test:integration`
You may need to wait again here (thanks cypress) but once the new cypress test window
appears you can click into the only test `app.spec.js` and it will run the tests

If for some reason cypress wasn't installed as part of the `npm install` you can run `npx cypress install`

When finished. If you don't use Cypress - you can delete the cache to remove it permanetly.

Details of the install are here https://docs.cypress.io/guides/getting-started/installing-cypress#Install-binary (uses default install directory)

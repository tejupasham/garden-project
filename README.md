# Project Botanico.

## What is Next.js

Next.js is a full-stack implementation of React.js and Node.js (Express.js) together in a single codebase.

## Styling using TailwindCSS

Tailwind is basically a set of classes and variables that we use to efficiently design our UI without writing custom classes.

## Installing pnpm

Why are we using `pnpm` instead of `npm`? If we use `npm` then it installs packages required in an utility library repeatedly. But if we use `pnpm`, it just installs the requirements required in our project as well as our dependencies and not reinstall packages again and again.

So, we make sure we have `pnpm` installed in your PC. We need to have Node.js installed in our PC to install these.

To install pnpm, we need to run

```
npm i -g pnpm
```

## Running the application

Unzip the ZIP file. Open your command line, then type.

```
pnpm install
```

To build our application, we run

```
pnpm run build
```

To start the development server, we need to run

```
pnpm start
```

## Database setup

We've used MySQL for our database and Prisma ORM (Object Relational Mapping). Prisma gives us an API to easily communicate with our MySQL database. We design our database using Prisma models stored in folder `prisma/schema.prisma`. To sync our Prisma models with our MySQL Server, we need to run

```
pnpm dlx prisma migrate dev
```

Our database is now synced with Prisma and we can use Prisma APIs to communicate with our MySQL Server.

## Saving a product to the database

We need to run

```
pnpm dlx prisma studio
```

After Prisma studio is open, we can add products to our database that will be shown to the customer. Note that, the images that we'll use in our application will be from unsplash.com. No other image URLs would be supported. This is mentioned in `next.config.js`.

## User authentication (Login and Register)

We have used an authentication library called NextAuth.js for logging in a registered user. If we use user credentials of a user who's not registered, we get error that the user isn't registered. Same goes for login.

## Placing an order

We view the product and if we wish to place an order for that, we click on continue. We're shown a payment page here. If we don't want to continue further, just click on cancel. To place an order, we put in some dummy card number to process the payment. For stripe, we can use card number: 4111111111111111, expiry date: 01/27 (make sure the year of expiry is greater than the current year), CVV: 111.

## Automation Testing

For automation testing, we've used **Cypress**. Cypress is like Jira, but it's more easy to use and open-source. We're planned testing on the homepage using `home.cy.ts`. We check if the user is logged in. So, if he/she is logged in, we can place an order. If the user isn't logged in, then we automate the login process. We check if the user credentials used in the test is registered to the database. If we find an error, then we go to register page. After that we create a user and the come back to login.

It fails because we check if we have any errors. If no error exists, then we get a PASS. To check, rerun this. If we rerun, we're directly logged in as the user credentials are synced with the database.

Next in `order.cy.ts`, we test the Ordering process. Again we check if the user is logged in. If he's logged in, he can process an order. If he's not logged in, then we take him to login and then authenticate him. After that we can place an order. Here, entering the Stripe card credentials are all automated using the library `cypress-plugin-stripe-elements`. To make sure the entering of the card credentials is working, we need to declare `chromeWebSecurity: false` in `e2e` property in `cypress.config.ts`, or else the automation of card credential input won't work.

```
pnpm run cypress:open
```

## Manual Testing and Error handling.

Firstly we use the browser development console to log error messages, and network tab to monitor network calls and their responses. Like when we use the same user credentials to register, we get error. Next we render this error in the UI using a toast message. Similarly, if we login using a user's credentials that isn't registered, we get user doesn't exist error, which we monitor in the console and then render in the UI.

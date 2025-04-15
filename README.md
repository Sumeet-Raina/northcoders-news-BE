# How to set up the .env files:

At the root of the project create below files

`.env.development` –> This file is used to set specific variables for development environment. Add `PGDATABASE=nc_news` to `.env.development`file to specify database name that we want to connect to when working in development environment.

`.env.test` – This file is used to set specific variables for test environment. Add `PGDATABASE=nc_news_test` to `.env.test` file to specify database name that we want to connect to when working in test environment.

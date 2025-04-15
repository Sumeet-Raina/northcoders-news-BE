## How to set up northcoders-news-BE project

### 1. Clone the repository

```bash
git clone https://github.com/Sumeet-Raina/northcoders-news-BE.git
cd northcoders-news-BE
```

### 2. Install dependencies

```bash
npm install
```

# How to set up the .env files and environment variables:

Create `.env.development` and `.env.test` files in the project root directory.

```.env
# .env.development
PGDATABASE=<name_of_your_development_database>
```

```.env
# .env.test
PGDATABASE=<name_of_your_test_database>
```

`.env.development` –> This file is used to set specific variables for development environment. Add `PGDATABASE=<name_of_your_development_database>` to `.env.development`file to specify database name that we want to connect to when working in development environment.

`.env.test` – This file is used to set specific variables for test environment. Add `PGDATABASE=<name_of_your_test_database>` to `.env.test` file to specify database name that we want to connect to when working in test environment.

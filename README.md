# NORTHCODERS NEWS API 📰

An API for NC News project.

## Setup

### 1. Clone project repository

```bash
git clone git@github.com:Sumeet-Raina/northcoders-news-BE.git
cd northcoders-news-BE
```

### 2. Install project dependencies 💻

```bash
npm install
```

> [!NOTE] > `northcoders-news-BE` requires node version `23`

### 3. Create environment variables 💻

Using `.env.example` as an example (...👀), create a `.env.development` and `.env.test` file in the root directory of the repository.

```bash
# .env.development
PGDATABASE=nc_news
PORT=3000
```

```bash
# .env.test
PGDATABASE=nc_news_test
PORT=3000
```

### 4. Setup databases 🗄️🗄️

```bash
npm run setup-dbs
npm run seed-dev
npm run seed-test
```

### 5. Run dev environment 💻

```bash
npm run dev
```

### 6. Run tests 💻

```bash
npm test
```

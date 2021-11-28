
# Currency Exchange Api


An api that allows you to convert currency and see the historical timeline of currency



## Run Locally

Clone the project

```bash
  git clone https://github.com/etfung/currency_exchange_api.git
```

Go to the project directory

```bash
  cd currency_exchange_api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## For Docker use

build for docker
```bash
  docker-compose build
```

run docker
```bash
  docker compose up -d
```

To turn off docker
```bash
  docker compose down
```
## API Reference

#### Convert currency

```http
  GET /convert
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `from` | `string` | **Required**. |
| `to` | `string` | **Required**. |
| `amount` | `number` | **Required**. |

#### Exchange Rate Year-over-Year Change

```http
  GET /history
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `start_date` | `string` | **Required**. format YYYY-MM-DD |
| `end_date` | `string` | **Required**. format YYYY-MM-DD |




## Running Tests

To run tests, run the following command

```bash
  npm run test
```


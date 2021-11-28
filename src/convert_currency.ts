import api from "./util/axios"
require('dotenv').config()

interface props {
  from: string
  to: string
  amount: number
}

const convert_currency = async ({ from, to, amount }: props) => {
  try {
    const response = await api.get(`convert?access_key=${process.env.EXCHANGE_RATE_API_KEY}&from=${from}&to=${to}&amount=${amount}`)

    return response.data

  } catch (e) {
    if (typeof e === "string") {
      return e.toUpperCase()
    } else if (e instanceof Error) {
      return e.message
    }
  }
}

export default convert_currency

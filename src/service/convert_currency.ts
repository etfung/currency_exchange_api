import fetch_data from "../util/fetch_data"
import { ApiResponse, Data } from "../types/exchange_rate"
interface Props {
  exchange_to: string
  amount: number
}



const convert_currency = async ({ exchange_to, amount }: Props) => {
  try {
    if (exchange_to.length > 3) {
      throw new Error('to must have only 1 country code')
    }
    const capitalizedExchangeTo = exchange_to.toUpperCase()
    const currentDate = new Date()
    const formatCurrentDate = currentDate.toISOString().slice(0, 10)
    const data: Data = await fetch_data({ formatCurrentDate, exchange_to: capitalizedExchangeTo })

    const rates = data.rates[capitalizedExchangeTo]
    const computeExchange = amount * rates
    return {
      exchange_from: data.base,
      exchange_to: capitalizedExchangeTo,
      exchange_rate: rates,
      exchange_from_amount: amount,
      exchange_to_amount: computeExchange,
    }

  } catch (e) {
    if (typeof e === "string") {
      throw new Error(e.toUpperCase())
    } else if (e instanceof Error) {
      throw new Error(e.message)
    }
  }
}

export default convert_currency

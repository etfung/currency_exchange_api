import { Dayjs } from "dayjs"
import { ApiResponse, Data } from "types/exchange_rate"
import api from "./axios"
require('dotenv').config()

interface Props {
  formatCurrentDate: string | Dayjs
  exchange_to: string
}

const fetch_data = async ({ formatCurrentDate, exchange_to }: Props): Promise<Data> => {
  const response: ApiResponse = await api.get(`${formatCurrentDate}?access_key=${process.env.EXCHANGE_RATE_API_KEY}&symbols=${exchange_to}`)
  const data: Data = response.data

  if (!data.success) {
    throw new Error('Something went wrong, Try again later.')
  }

  return data
}

export default fetch_data
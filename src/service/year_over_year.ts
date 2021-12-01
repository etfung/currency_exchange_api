import fetch_data from "../util/fetch_data"
import get_difference_date from "../util/get_difference_date"

interface Props {
  start_date: string
  end_date: string
  data_type: 'daily' | 'monthly' | 'yearly'
  exchange_to: string
}


const year_over_year = async ({ start_date, end_date, data_type, exchange_to }: Props) => {
  // const capitalized_exchange_to = exchange_to.toUpperCase()
  try {
    const data: [{ [x: string]: string | null; }] = [{}]
    let prev_rate = 0
    const compiled_dates = get_difference_date({ start_date, end_date, data_type })
    for (let i = 0, j = 1; i < compiled_dates.length; i++, j++) {
      let computed_percentage = 0
      const next_index = j == compiled_dates.length ? j - 1 : j
      const response_data_prev = await fetch_data({ formatCurrentDate: compiled_dates[i], exchange_to })
      const response_data_current = await fetch_data({ formatCurrentDate: compiled_dates[next_index], exchange_to })
      prev_rate = response_data_prev.rates[exchange_to]
      const current_rate = response_data_current.rates[exchange_to]
      computed_percentage = ((current_rate - prev_rate) / prev_rate) * 100
      const remove_negative = Math.abs(computed_percentage).toFixed(2)
      const positive_negative_sign = current_rate > prev_rate ? '+' : '-'
      const format_percentage = `${positive_negative_sign}${remove_negative}`
      if (i === 0) {
        data[0] = ({ [response_data_prev.date]: null })
        data.push({ [response_data_current.date]: format_percentage })
      } else if (i !== next_index) {
        data.push({ [response_data_current.date]: format_percentage })
      }
    }
    return data
  } catch (e) {
    if (typeof e === "string") {
      throw new Error(e.toUpperCase())
    } else if (e instanceof Error) {
      throw new Error(e.message)
    }
  }
}

export default year_over_year
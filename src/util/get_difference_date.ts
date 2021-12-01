import dayjs, { Dayjs } from "dayjs"
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

interface Props {
  start_date: string
  end_date: string
  data_type: 'daily' | 'monthly' | 'yearly'
}

var get_days_between = (startDate: Dayjs, endDate: Dayjs, type: 'y' | 'M' | 'd') => {
  const nbDays = endDate.diff(startDate, type) + 1
  const result = [...Array(nbDays).keys()]
    .map(i => startDate.clone().add(i, type).format('YYYY-MM-DD'))

  return result;
};


const get_difference_date = ({ start_date, end_date, data_type }: Props): Dayjs[] | string[] => {
  const today = dayjs(new Date());
  const dayjs_start_date = dayjs(start_date)
  const dayjs_end_date = dayjs(end_date)
  let compiled_date = []

  switch (data_type) {
    case 'daily':
      compiled_date = get_days_between(dayjs_start_date, dayjs_end_date, 'd')
      break;
    case 'monthly':
      compiled_date = get_days_between(dayjs_start_date, dayjs_end_date, 'M')
      break;
    case 'yearly':
      compiled_date = get_days_between(dayjs_start_date, dayjs_end_date, 'y')
      break;
  }
  return compiled_date
}

export default get_difference_date
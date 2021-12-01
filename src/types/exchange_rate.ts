export interface ApiResponse {
  data: Data
}

export interface Data {
  success: boolean,
  timestamp: number,
  historical: boolean,
  base: string,
  date: string,
  rates: Record<string, number>
}
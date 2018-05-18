export interface State {
  counter: number
}
export interface City {
  id: number,
  title: string,
  area?: string,
  region?: string
}

export interface CityResponse {
  items: Array<City>,
  count: number
}
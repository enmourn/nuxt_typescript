export interface State {
  counter: number
}
export interface City {
  id: number,
  title: string,
  area?: string,
  region?: string
}

export interface CurrentSearch {
  query: string,
  offset: number,
  chunk_size: number,
  count: number,
  cities: Array<City>
}

export interface SearchResponse {
  count: number,
  items: Array<City>
}
import { FakerType } from "./faker_types";

export type ApiTemplate = {
  [key: string]: FakerType | ApiTemplate
}

export type Settings = {
  count: number
  filters: any
  orders: any[]
}
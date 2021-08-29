import { FakerType } from "./faker_types";

export type APIResponse = {
  [key: string]: FakerType | APIResponse
}

export type Settings = {
  count: number
  filter?: any
  order?: any
}
import { APIResponse, Settings } from "./types"

export const APISettings: Settings = {
  count: 1000
}

export const APITypes: APIResponse = {
  'id': 'datatype.uuid',
  'name': 'name.firstName',
  'last_name': 'name.lastName',
  'telephone': 'phone.phoneNumber',
  'address': 'address.streetAddress',
  'transaction_info': {
    'currency': 'finance.currencyName',
    'amount': 'finance.amount',
  },
  'country': {
    'id': 'datatype.uuid',
    'name': 'address.country'
  }
}
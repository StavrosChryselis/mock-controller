import { ApiTemplate } from "./types"

export const TemplateMap: Map<string, ApiTemplate> = new Map([
  [
    'sample-template', {
      'id': 'datatype.uuid',
      'name': 'name.firstName',
      'last_name': 'name.lastName',
      'telephone': 'phone.phoneNumber',
      'address': 'address.streetAddress',
      'transaction_info': {
        'currency': 'finance.currencyName',
        'amount': 'finance.amount',
        'nested': {
          'inner_nested': 'datatype.number'
        }
      },
      'country': {
        'id': 'datatype.uuid',
        'name': 'address.country'
      }
    }
]
])
import { APIResponse, Settings } from './types'
import { FakerType } from './faker_types'
import faker from 'faker'

const objectMap = (obj:APIResponse, fn:(value:FakerType | APIResponse,key:string,index:number)=>any):any =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]))

const recursive_apply = (obj:any,keys:string[]):any => keys.length === 0 ? obj() : recursive_apply(obj[keys[0]],keys.slice(1))

const generate = (type:FakerType):any => recursive_apply(faker,type.split('.'))

export const generateRecord = (type:APIResponse):any => 
  objectMap(type, value => typeof value !== 'object' ? generate(value) : generateRecord(value))

export const mock = (type:APIResponse, settings:Settings):any[] => Array.from(Array(settings.count)).map(() => generateRecord(type))
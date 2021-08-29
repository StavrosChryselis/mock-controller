import { APIResponse, Settings } from './types'
import { FakerType } from './faker_types'
import faker from 'faker'

const withReference = <T1,T2>(obj:T1,callback:(obj:T1) => T2):T2 => callback(obj)
const withValue = <T1,T2>(obj:T1,callback:(obj:T1) => T2):T2 => callback({...obj})

const objectMap = (obj:APIResponse, fn:(value:FakerType | APIResponse,key:string,index:number)=>any):any =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]))

const recursiveTraverse = (obj:any,keys:string[]):any => keys.length === 0 ? obj : recursiveTraverse(obj[keys[0]],keys.slice(1))

const generate = (objectPath:string):any => recursiveTraverse(faker,objectPath.split('.'))()
const retrieve = (objectPath:string,object:any):any => recursiveTraverse(object,objectPath.split('.'))

const generateRecord = (type:APIResponse):any => 
  objectMap(type, value => typeof value !== 'object' ? generate(value) : generateRecord(value))

export const mock = (type:APIResponse, settings:Settings):any[] => withReference(Array.from(Array(settings.count)).map(() => generateRecord(type)), records => settings.orders.length != 0
  ? records.sort((a,b) => withReference([retrieve(settings.orders[0][0],a),retrieve(settings.orders[0][0],b)], ([el1,el2]) => Number.isNaN(Number.parseInt(el1))
    ? el1 < el2 
      ? settings.orders[0][1] == 'asc' ? -1 : 1 
      : el1 == el2 
        ? 0 
        : settings.orders[0][1] == 'asc' ? 1 : -1
    : settings.orders[0][1] == 'asc' ? el1 - el2 : el2 - el1))
  : records)
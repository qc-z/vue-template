// transfrom.ts 根据 Mod.name进行过滤
import { StandardDataSource } from 'pont-engine'

export default function transform(data: StandardDataSource) {
  if (data.name && data.name.includes('*')) {
    data.name = data.name.replace('*', '')
  }
  return data
}

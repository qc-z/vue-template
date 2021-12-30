// eslint-disable-next-line
import { CodeGenerator, Interface, Mod, BaseClass, Surrounding } from 'pont-engine'
import * as pont from 'pont-engine'

export default class MyGenerator extends CodeGenerator {
  /** 获取某个基类的类型定义代码 */
  getBaseClassInDeclaration(base: BaseClass) {
    return `class ${base.name} ${
      base.name === 'Payload' || base.name === 'PageBean' ? '<T0>' : ''
    } {
      ${base.properties
        .map((prop: any) => {
          // 替换 defs. 不使用 defs 命名空间
          let propertyCode = prop
            .toPropertyCode(Surrounding.typeScript, true)
            .replace(/defs\./g, '')

          // 如果属性是范型参考，则属性为必选
          // 例如 data?: T0 , creditCustomerConsumptionDailyVo?: CreditManagerV2.AggregateAllTransactionDetailsWithinDimensions[]
          if (prop.dataType.reference || base.name === 'Payload' || base.name === 'PageBean') {
            propertyCode = propertyCode
              .replace(/\?/, '')
              .replace(/content\:/, 'content?:')
              .replace(/payload\:/, 'payload?:')
          }
          return propertyCode
        })
        .join('\n')}
    }
    `
  }

  /** 获取所有基类的类型定义代码，一个 namespace */
  getBaseClassesInDeclaration() {
    const content = `namespace ${this.dataSource.name || 'defs'} {
      ${this.dataSource.baseClasses
        .map(
          (base) => `
        export ${this.getBaseClassInDeclaration(base)}
      `
        )
        .join('\n')}
    }
    `

    return content
  }

  /** 获取接口内容的类型定义代码 */
  getInterfaceContentInDeclaration(inter: Interface) {
    let bodyParams = inter.getBodyParamsCode()
    if (bodyParams.includes('defs.')) {
      bodyParams = bodyParams.replace(/defs\./g, '')
    }
    const paramsCode = inter
      .getParamsCode()
      .replace(/tenantId\:/g, 'tenantId?:')
      .replace(/userId\:/g, 'userId?:')
      .replace(/username\:/g, 'username?:')

    const isEmptyParams = paramsCode.replace(/(\n|\s)/g, '') === 'classParams{}'

    const requestArgs = []

    // @ts-ignore
    !isEmptyParams && requestArgs.push('params: Params')
    // @ts-ignore
    bodyParams && requestArgs.push(`bodyParams: ${bodyParams}`)
    // @ts-ignore
    requestArgs.push(`options?: RequestConfig`)
    const requestParams = requestArgs.join(', ')

    let { responseType } = inter
    if (responseType.includes('defs.')) {
      responseType = responseType.replace(/defs\./g, '')
    }
    const resArr = responseType.split('<')
    const lastItem = resArr[resArr.length - 1]

    let resStr = responseType
    if (lastItem && lastItem.indexOf('.') > -1) {
      resArr.splice(resArr.length - 1, 0, 'Required')
      resStr = `${resArr.join('<')}>`
    }
    const urlParamsKeysStr = (inter.path.match(/(?<={)(.*?)(?=})/g) || [])
      .map((item) => `'${item}'`)
      .join('|')
    // 获取URL中的keys
    // 在params中获取对应的值
    return `
      ${isEmptyParams ? '' : `export ${paramsCode}`}
      export type ResponseType = Promise<${resStr}>
      ${urlParamsKeysStr ? `export type UrlParamType = ${urlParamsKeysStr}` : ''}
      export function getUrl(${
        urlParamsKeysStr ? 'params: Pick<Params, UrlParamType>' : ''
      }): string;
      export function request(${requestParams}): ResponseType;
    `
  }

  /** 获取公共的类型定义代码 */
  getCommonDeclaration() {
    return `
    import {RequestConfig} from '@/pontHelper/fetch'
    type Required<T> = { [P in keyof T]-?: T[P] };
    type Pick<T, K extends keyof T> = { [P in K]: T[P] };
    `
  }

  /** 获取接口实现内容的代码 */
  getInterfaceContent(inter: Interface) {
    const bodyParams = inter.getBodyParamsCode()
    const paramsCode = inter.getParamsCode()
    const isEmptyParams = paramsCode.replace(/(\n|\s)/g, '') === 'classParams{}'
    const contentType =
      inter.consumes && inter.consumes.length ? inter.consumes[0] : 'application/json'

    const requestArgs: string[] = []
    !isEmptyParams && requestArgs.push(`params:any`)
    bodyParams && requestArgs.push(`bodyParams:any`)
    requestArgs.push('options:any')
    const requestParams = requestArgs.join(', ')

    return `
    import { fetch, urlResolve } from '@/pontHelper/fetch';
    import { API_HOST } from '@/constant'

    const getWholePath = (path:string) => {
      return API_HOST+ '/yzd-pw' + path
    }
    /**
     * @desc 获取请求的URL
     */
    export function getUrl(paramsObj:any) {
      return urlResolve(getWholePath('${inter.path}'), paramsObj)
    }

    /**
     * @desc ${inter.description}
     */
    export function request(${requestParams}) {
      const fetchOption = {
        url: getWholePath('${inter.path}'),
        method: '${inter.method}',
        headers: {
          'Content-Type': '${contentType}'
        },
        ${isEmptyParams ? '' : 'params,'}
        ${bodyParams ? 'data: bodyParams' : ''}
        ...options
      }
      return fetch(fetchOption);
    }
   `
  }

  /** 获取单个模块的 index 入口文件 */
  getModIndex(mod: Mod) {
    return `
      /**
       * @description ${mod.description}
       */
      ${mod.interfaces
        .map((inter) => {
          return `import * as ${inter.name} from './${inter.name}';`
        })
        .join('\n')}

      export {
        ${mod.interfaces.map((inter) => inter.name).join(', \n')}
      }
    `
  }

  /** 获取所有模块的 index 入口文件 */
  getModsIndex() {
    let conclusion = `
      export const API = {
        ${this.dataSource.mods.map((mod) => mod.name).join(', \n')}
      };
    `

    // dataSource name means multiple dataSource
    if (this.dataSource.name) {
      conclusion = `
        export const ${this.dataSource.name} = {
          ${this.dataSource.mods.map((mod) => mod.name).join(', \n')}
        };
      `
    }

    return `
      ${this.dataSource.mods
        .map((mod) => {
          return `import * as ${mod.name} from './${mod.name}';`
        })
        .join('\n')}

      ${conclusion}
    `
  }

  /** 获取接口类和基类的总的 index 入口文件代码 */
  getIndex() {
    let conclusion = `
      export * from './mods/';
    `

    // dataSource name means multiple dataSource
    if (this.dataSource.name) {
      conclusion = `
        export { ${this.dataSource.name} } from './mods/';
      `
    }

    return conclusion
  }
}

export class FileStructures extends pont.FileStructures {
  getModsDeclaration(originCode: string, usingMultipleOrigins: boolean) {
    return `
      export ${originCode}
    `
  }

  getBaseClassesInDeclaration(originCode: string, usingMultipleOrigins: boolean) {
    return `
      export ${originCode}
    `
  }

  getDataSourcesDeclarationTs() {
    const dsNames = (this as any).generators.map((ge) => ge.dataSource.name)

    return `
      ${dsNames
        .map((name) => {
          return `export {${name}} from './${name}/api';`
        })
        .join('\n')}
      export as namespace defs;
    `
  }

  getDataSourcesTs() {
    const dsNames = (this as any).generators.map((ge) => ge.dataSource.name)

    return `
      ${dsNames
        .map((name) => {
          return `import { ${name} } from './${name}';`
        })
        .join('\n')}
      import defs from './api';

      export type apitype = typeof defs;
      export const api = {${dsNames.join(',')}} as apitype;

    `
  }
}

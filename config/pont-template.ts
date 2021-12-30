/* eslint-disable */

import { CodeGenerator, Interface } from 'pont-engine'

/**
 * @desc 获取请求的URL
 */
export default class MyGenerator extends CodeGenerator {
  getInterfaceContent(inter: Interface) {
    let url = inter.path
    let isIdentification = ''
    const identification = '{'
    let paramsArray = []
    if (url.includes(identification)) {
      const result = url.split(identification)[0]
      url = `${result}`
      inter.parameters.forEach((item) => {
        if (item.in !== 'header') {
          paramsArray.push(item.name)
        }
      })
      isIdentification = '+data?.' + paramsArray.join('')
    }
    const paramsCode = inter.getParamsCode()
    const Interfaces = inter.getParamsCode().replace(/class/, 'interface')
    const method = inter.method.toUpperCase()
    const description = inter.description.replace(/(\n|\s)/g, '')
    const contentType =
      inter.consumes && inter.consumes.length ? inter.consumes[0] : 'application/json'

    // 判断参数是否可选
    const isRequired = inter.parameters.some((item) => item.in === 'path' && item.required)
      ? ''
      : '?'
    return `


    import request from '@/utils/request';
    import { API_HOST } from '@/constant'
    import * as defs from '../../baseClass';


    /**
      * @description ${description}
      * @name ${inter.name}
      */

    ${Interfaces}
    export async function ${inter.name}(data${isRequired}: Params) {
      const options = {
        method: '${method}',
        url: API_HOST + '${url}' ${isIdentification},
        ${isIdentification ? '' : 'data,'}
        name: '${description}',
        headers: {
          'Content-Type': '${contentType}'
        }
      }
      return request(options);
    }
    export const init = ${inter.response.initialValue};
   `
  }

  /** 获取所有模块的 index 入口文件 */
  getModsIndex() {
    let conclusion = `
      export {
        ${this.dataSource.mods
          .filter((mod) => mod.name !== 'login')
          .map((mod) => mod.name)
          .join(', \n')}
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
        .filter((mod) => mod.name !== 'login')
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
      export * from './mods';
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

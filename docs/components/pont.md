## pont 使用

### 本文介绍的工具是 [pont](https://github.com/alibaba/pont) , 在法语中是“桥”的意思，寓意着前后端之间的桥梁。

Pont 把 swagger、rap、dip 等多种接口文档平台，转换成 Pont 元数据。Pont 利用接口元数据，可以高度定制化生成前端接口层代码，接口 mock 平台和接口测试平台。
![image.png](/image1.png)

### 1 安装依赖

1.1 使用命令行 全局安装
`npm i -g pont-engine`  
​

1.2 安装 vscode 插件 vscode-pont（**推荐**）
**一旦检测到项目中存在有效的 pont-config.json 配置文件，插件便会启动。你将在插件底部看到如下状态栏：**
![image.png](/image2.png)
[使用方法](https://github.com/alibaba/pont)​

### 2 新建 pont-config.json

```json
{
  "outDir": "../src/api",
  "originUrl": "https://petstore.swagger.io/v2/swagger.json",
  "templatePath": "./pont-template",
  "prettierConfig": {
    "useTabs": false,
    "tabWidth": 2,
    "printWidth": 100,
    "singleQuote": true,
    "trailingComma": "none",
    "bracketSpacing": true,
    "semi": false
  }
}
```

### 3 定义自己的 template 文件(模板)

```typescript
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
```

### 4 定义自己的 transformTemplate(数据源预处理路径)

```typescript
// transfrom.ts 根据 Mod.name进行过滤
import { StandardDataSource } from 'pont-engine'

export default function transform(data: StandardDataSource) {
  if (data.name && data.name.includes('*')) {
    data.name = data.name.replace('*', '')
  }
  return data
}
```

### 5 生成对应的文件

![image.png](/image3.png)

### 6 使用方法

```javascript
import { qylbPage } from '@api/companyMonit/qylbPage'

qylbPage().then((res) => {
  console.log(res)
})
```

或者挂载在全局调用也行

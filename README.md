    #demo
    vue init webpack project
    开发目录结构未做调整，具体项目中需根据架构重新设计

    注：此demo基于vue-cli脚手架生成,做了如下修改：
    1、引入vuex
    2、新增typescript文件解析(.ts || .vue > lang='ts')
    3、自动生成压缩包（若需要可开启配置）
    4、启动node服务预览build
    5、devServer时获取ip启动浏览器，而非默认的locallhost（只做了简单测试）
    6、若项目需引入jquery，需引入ProvidePlugin插件。如还需基于jq的第三方插件可引入expose-loader（推荐使用）
    7、路由模块加载改为懒加载形式
    8、加入图片压缩imagemin-webpack-plugin插件，可选择开启(default:false)

    自动生成压缩包：
    node build/pack
    /build/pack.js      生成压缩包配置文件
    /config/version.json     记录版本信息

    test:
    npm run test    //启动node服务,模拟线上服务器

    /dist                   生成打包文件目录
    /src                    开发目录
    /static                 copy静态文件存放目录
    tsconfig.json           typescript 配置文件
    /build/utils.js         create Loaders 工具函数
    /config/router.js        全局参数配置

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

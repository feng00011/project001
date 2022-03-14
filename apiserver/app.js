// 导入express
const express = require('express')

// 实例化服务器
const app = express()

// 导入cors中间件
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件 x-www格式可解析，其余不行
app.use(express.urlencoded({extended:false}))


// 导入并且使用路由模块(读取node-dege模块生成拓扑图)
const initNode = require('./router/NodeEdge')
app.use('/api',initNode)
// 访问地址前要加api














// 启动服务器
app.listen(80,()=>{
    console.log('服务器运行在80端口');
})
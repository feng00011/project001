// 导入express
const express = require('express')
const NodeJSON = require('../router_handler/NodeData')
const EdgeJSON = require('../router_handler/EdgeData')
const addNode = require('../router_handler/addNode')
const delNode = require('../router_handler/delNode')
const addEdge = require('../router_handler/addEdge')
const editName = require('../router_handler/editName')
const editEdge = require('../router_handler/editEdge')


// 创建路有对象
var router = express.Router()


//图片获取后台数据
router.get('/nodedata',NodeJSON.dotSrc)
router.get('/edgedata',EdgeJSON.dotSrc)
router.post('/addnode',addNode.addNode)
router.post('/delnode',delNode.delNode)
router.post('/addedge',addEdge.addEdge)
router.post('/editname',editName.editName)
router.post('/editedge',editEdge.editEdge)



// router.post('/editedge',EdgeJSON.dotSrc)



// 将对象共享出去
module.exports = router;
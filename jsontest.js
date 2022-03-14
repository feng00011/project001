const path = require('path')
// const csv = require('csv');
const csvj = require('csvtojson')
// const fs = require('fs')
const NodePath = path.join(__dirname, './data/NodeList.csv')
const EdgePath = path.join(__dirname, './data/EdgeList.csv')

const arrList = []
var dotSrc;
const myWay = async () => {
    const Node = await csvj().fromFile(NodePath);
    const Edge = await csvj().fromFile(EdgePath);
    // 必须在async函数内部，才能导出URL，异步
    // setdot(Node, Edge)
    console.log(Node);
    dotSrc = arrList.join('\n');
    console.log(dotSrc);
}
myWay()

// 拼接字符串
function setdot(targetN, targetE) {
    for (i = 0; i < targetN.length; i++) {
        arrList[i] = '    ' + targetN[i].name + ' [id=' + '"' + targetN[i].id + '"' + ' label=' + '"' + targetN[i].label + '"' + ' color="red"]';
    }
    for(i = 0; i < targetN.length; i++){
        arrList[targetN.length+i] = '    ' + targetE[i].prior + ' -> '+targetE[i].next + ' [id=' + '"' + targetE[i].id + '"' + ' label=' + '"' + targetE[i].label + '"' + ' color="red"]';
    }
    // console.log(arrList[0]);
    // console.log(arrList[6]);
    // 插入剩下的部分，构成dot语句公d3使用
    arrList.unshift('digraph {')
    arrList.unshift('')
    arrList.push('}')
    arrList.push('')   
}




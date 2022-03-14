exports.delNode = (req, res) => {
    const fs = require('fs');
    const path = require('path')
    
    const mess = req.body;
    const nameN = mess.delName;
    // 不仅要删除节点，还要连同那些路径一起删除
    const nodePath = path.join(__dirname, '../../data/NodeList.json')
    const edgePath = path.join(__dirname, '../../data/EdgeList.json')

    fs.readFile(nodePath, 'utf8', function (err, data) {
        var arr = JSON.parse(data)
        console.log(arr);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].nodeName == nameN) {
                arr.splice(i,1)
                // 节点只删除一个，所以这个不用担心，但是edge就不一样了，edge有好几个，slice之后i++的位置注意
            }
        }
        var new_arr = JSON.stringify(arr)
        fs.writeFile(nodePath, new_arr, function (err1, data1) {
            // res.send('idd')
        })  

    })
    fs.readFile(edgePath, 'utf8', function (err2, data2) {
        var arr2 = JSON.parse(data2)
        for (var j = 0; j < arr2.length;) {
            if (arr2[j].prior == nameN || arr2[j].next == nameN) {
                arr2.splice(j,1)
                //splice会改变原数组，所以j++这里不能加了
            }else{
                j++;
            }
        }
        var new_arr2 = JSON.stringify(arr2)
        fs.writeFile(edgePath, new_arr2, function (err3, data3) {
            // res.send('idd')
        })  

    })

}








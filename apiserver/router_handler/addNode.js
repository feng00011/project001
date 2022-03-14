exports.addNode = (req, res) => {
    // res.send(req.body)
    //nodeAddNodeName, nodeAddNodeEdge
    const fs = require('fs');
    const path = require('path')

    const mess = req.body;
    let newnode = mess.nodeAddNodeName.trim()
    let newedge = mess.nodeAddNodeEdge
    const nodePath = path.join(__dirname, '../../data/NodeList.json')
    const edgePath = path.join(__dirname, '../../data/EdgeList.json')
    // 创建新节点
    if (newnode != '') {
        fs.readFile(nodePath, 'utf8', function (err, data) {
            var arr = JSON.parse(data)
            console.log(arr);
            let num = arr[arr.length - 1].id + 1
            // 确定这个节点的id值，主键，自增长
            let idd = num;
            let nodeName = 'Node' + num
            let nodeId = 'NodeId' + num
            let label = newnode;
            // 用户只输入node的label，其余的都要我们生成
            var valueL = [idd, nodeName, nodeId, label]
            if (regT(label, arr)) {
                //验证输入的label名是否重复
                var keysL = []
                var test2 = {}
                for (var key in arr[0]) {
                    keysL.push(key)
                }
                for (var i = 0; i < keysL.length; i++) {
                    test2[keysL[i]] = valueL[i]
                }
                // console.log(test2);
                // 组装新的对象完成
                arr.push(test2)
                // 将新的对象写进json数组
                var new_arr = JSON.stringify(arr)
                // 转为json
                console.log(arr);
                fs.writeFile(nodePath, new_arr, function (err2, data2) {
                    // console.log(JSON.parse(data2));
                    res.send(err2)
                })

            }


        })
    }else{
        res.send({
            status: 12,
            msg: '输入合法名称！'
        })
    }

    function regT(info, arrBase) {
        for (const value of arrBase) {
            // console.log(value);
            if (info == value.label) {
                res.send({
                    status: 11,
                    msg: '名称重复！'
                });
                return false
            }
        }
        console.log('yes');
        return true
    }

    // res.send(newnode)
}








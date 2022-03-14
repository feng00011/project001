exports.addEdge = (req, res) => {
    // res.send(req.body.nodeAddNodeEdge)
    //nodeAddNodeName, nodeAddNodeEdge
    const fs = require('fs');
    const path = require('path')
    const nodePath = path.join(__dirname, '../../data/NodeList.json')
    const edgePath = path.join(__dirname, '../../data/EdgeList.json')
    const mess = req.body;
    // let arrE = []
    let newedge = mess.nodeAddNodeEdge.trim()
    // 输入为空就跳出
    if(newedge==''){
        // return
        res.send({
            status:12,
            msg:'输入不合法'
        })
        return
        // return结束路由处理函数
         
    }
    var tmp1 = newedge.split(';')
    var prNodename = '';
    var ntNodename = '';
    for (let i = 0; i < tmp1.length; i++) {
        let pr = tmp1[i].match(/\w*(?=->)/)[0]
        let nt = tmp1[i].match(/->(\S*):/)[1]
        let lb = tmp1[i].match(/(?<=:)\w*/)[0]
        // 匹配对应的node名和lable名
        if(pr==''||nt==''||lb==''){
            // 输入为空就跳出
            res.send({
                status:12,
                msg:'输入合法'
            })
            return 
        }
        fs.readFile(nodePath, 'utf8', function (err1, data1) {
            var arr1 = JSON.parse(data1)
            let flagpr = 0;
            let flagnt = 0;
            // flag：判断前后节点是否都存在
            for (let j = 0; j < arr1.length; j++) {
                if (arr1[j].label == pr) {
                    prNodename = arr1[j].nodeName
                    flagpr = 1;
                }
                if (arr1[j].label == nt) {
                    ntNodename = arr1[j].nodeName
                    flagnt = 1;
                }
                if (flagpr == 1 && flagnt == 1) {
                    // flagpr=0
                    // flagnt=0
                    break
                }
            }
            if (flagpr == 0 || flagnt == 0) {
                res.send({
                    status:10,
                    msg:'节点不存在'
                })
                return
            }
            // 写入edge文件
            fs.readFile(edgePath, 'utf8', function (err, data) {
                var arr = JSON.parse(data)
                console.log(arr);
                let num = arr[arr.length - 1].id + 1
                // 确定这个节点的id值，主键，自增长
                let idd = num;
                let prior = prNodename
                let next = ntNodename
                let EdgeIdId = 'EdgeIdId' + num
                let label = lb;
                // 用户只输入node的label，其余的都要我们生成
                var valueL = [idd, prior, next, EdgeIdId,label]
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
                    fs.writeFile(edgePath, new_arr, function (err2, data2) {
                        // console.log(JSON.parse(data2));
                        res.send(err2)
                    })

                }


            })

        })

    }

    function regT(info, arrBase) {
        for (const value of arrBase) {
            // console.log(value);
            if (info == value.label) {
                // 判断路径名称是否重复（edge里不用管node名称是否重复，注意都是名称，所以判断的都是label）
                res.send({
                    status: 11,
                    msg: '路径名称重复！'
                });
                return false
            }
        }
        console.log('yes');
        return true
    }

    // res.send(newnode)
}








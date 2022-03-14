const fs = require('fs');
const path = require('path')
const nodePath = path.join(__dirname, './data/NodeList.json')
const edgePath = path.join(__dirname, './data/EdgeList.json')

let arrE = []
let newedge = 'N1->N4:E156'
var tmp1 = newedge.split(';')
var prNodename = '';
var ntNodename = '';
for (let j = 0; j < tmp1.length; j++) {
    let pr = tmp1[j].match(/\w*(?=->)/)[0]
    let nt = tmp1[j].match(/->(\S*):/)[1]
    let lb = tmp1[j].match(/(?<=:)\w*/)[0]
    console.log(pr,nt,lb);
    fs.readFile(nodePath, 'utf8', function (err1, data1) {
        var arr1 = JSON.parse(data1)
        let flagpr = 0;
        let flagnt = 0;
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
                break
            }
        }
        if (flagpr == 0 || flagnt == 0) {
            
            return false
        }
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
            var valueL = [idd, prior, next, EdgeIdId, label]
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
                    
                })

            }


        })

    })
    // res.send('err2')
    // 创建新节点


}

// 


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

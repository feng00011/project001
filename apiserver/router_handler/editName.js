exports.editName = (req, res) => {
    const fs = require('fs');
    const path = require('path')
    const nodePath = path.join(__dirname, '../../data/NodeList.json')
    const edgePath = path.join(__dirname, '../../data/EdgeList.json')
    const mess = req.body.editName;
    // 要改的lebel名称
    const class1 =req.body.thisEditClass;
    
    // 类型node？edge？
    const thisid = req.body.thisEditOldId;
    // nodeid，edgeid（不是数字的那个id）
    // res.send(thisid)
    // res.send(class1)
    
    if(class1 == 'node'){
        // res.send(class1)
        fs.readFile(nodePath,'utf8',function(err1,data1){
            let arr1 = JSON.parse(data1)
            // res.send(arr1[0].label)
            for(let i =0 ;i<arr1.length;i++){
                if(arr1[i].label == mess){
                    res.send({
                        status:11,
                        msg:'名称重复！'
                    })
                    return    
                }
                // res.send(class1)        
            }
            for(let i =0 ;i<arr1.length;i++){
                if(arr1[i].nodeId==thisid){
                    arr1[i].label = mess;
                    // res.send(arr1)     
                }
            }
            let new_arr = JSON.stringify(arr1)
            fs.writeFile(nodePath, new_arr, function (err2, data2) {
                // console.log(JSON.parse(data2));
                res.send({
                    status:8,
                    msg:'修改成功'
                })
            })
        }) 
        // res.send(thisid)
    }else if (class1 == 'edge'){
        fs.readFile(edgePath,'utf8',function(err1,data1){
            let arr1 = JSON.parse(data1)
            // res.send(arr1[0].label)
            for(let i =0 ;i<arr1.length;i++){
                if(arr1[i].label == mess){
                    res.send({
                        status:11,
                        msg:'名称重复！'
                    })
                    return    
                }
                // res.send(class1)        
            }
            // res.send(thisid)
            for(let i =0 ;i<arr1.length;i++){
                if(arr1[i].edgeId==thisid){
                    arr1[i].label = mess;
                    // res.send(arr1)     
                }
            }
            let new_arr = JSON.stringify(arr1)
            fs.writeFile(edgePath, new_arr, function (err2, data2) {
                // console.log(JSON.parse(data2));
                res.send({
                    status:8,
                    msg:'修改成功'
                })
            })
        }) 
    }
   
}
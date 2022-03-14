// var fs = require('fs');
// const Json2csvParser = require('json2csv').Parser;
// const fields = ['car', 'price', 'color', 'for'];

// let myData = fs.readFileSync('./data.json');

// const json2csvParser = new Json2csvParser({ fields });

// const csv = json2csvParser.parse(JSON.parse(myData));

// fs.writeFile("./data.csv", csv, function(err) {
//     if(err) {
//         return console.log(err);
//     }

//     console.log("The file was saved!");
// });

const fs = require('fs')
fs.readFile('./data.json', 'utf8', function (err, data) {
    var te = []
    var arr = JSON.parse(data)
    console.log(arr);

    // for(var i = 0;i<arr.length;i++){
    //     if(arr[i].car=='BMW'){
    //         // arr.splice(i,1)
    //         // 删除一项（也有查的意思了，这个似乎没必要验证了）
    //         arr[i].price = 50000
    //         // 修改内容(这个验证只需要在上面验证是否为空，格式是否正确)

    //     }
    // }
    // 组装新的对象（增）（验证的大头在这里：1、该输入的是否都输入了（结合前端）2、有没有和数据库（json）里的内容重复了，总要设置一个主键把，让他自增长，还是用id，（数字好操控，思路：因为是增加，所以，只要用arr.length作为id就可以了），然后就能组装nodeid了
    let num = arr[arr.length - 1].id+1
    let idd = num;
    let nodeName = 'Node' + num
    let nodeId = 'NodeId' + num
    let label = 'N' + num;
    // 前台的input还是写名称，那就是用lable了，所以这里的lable应该是传过来的值，这样实际上就实现了自增长了，但是会有个bug，比如我删除中间一个对象，那最后将会出现id重复，所以不要简单用arr.length来实现，应该找到里面的最大的id值传出来，前台输入节点名称，再输入这个节点的prior和next节点（这里也要验证，如果那些节点不存在，也要报错（依据依旧是label的名称，感觉不太好，名字太长了出错了怎么办，还是在页面中显示id？那也不方便看啊，还是用label吧，大不了返回的提示指明哪个节点不存在，对了这样的话，节点储存名称的时候记得trim()一下。
    //总体流程来看：删除：直接返回id，对应删除就行了，这是最简单的
    //修改：麻烦的点在与前台的动态输入框，然后传值给后台进行修改就行了
    //增加：一堆input框，传值给后台，新建node，和edge（这个可能需要一点操作），输入edge的时候，就俩输入框，prior和next，用特殊符号作为分隔好了？毕竟你不知道对方会输入几个节点
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
        // console.log(arr);
        var new_arr = JSON.stringify(arr)
        // 转为json
        console.log(arr);
        fs.writeFile('./data.json', new_arr, function (err2, data2) {
            // console.log(JSON.parse(data2));
            console.log(err2);
        })

    }

})
// 还需要验证是否有重复的，输入的是否合法（这里可以通过表单前台实现）
function regT(info, arrBase) {
    for (const value of arrBase) {
        // console.log(value);
        if (info == value.label) {
            console.log('error!!!!!!!!!!!!!!!!!!!');
            return false
        }
    }
    console.log('yes');
    return true
}
// value of arr:输出数组中每个元素
// key in arr :输出数组中每个索引index

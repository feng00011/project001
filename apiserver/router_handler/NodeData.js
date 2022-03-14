exports.dotSrc = (req, res) => {
    const path = require('path')
    // const csv = require('csv');
    // const csvj = require('csvtojson')
    const fs = require('fs')
    const NodePath = path.join(__dirname, '../../data/NodeList.json')
    console.log(NodePath);
    fs.readFile(NodePath, 'utf8', function (err, result) {
        console.log(result);
        res.send(result)
    })
}




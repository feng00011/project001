exports.dotSrc = (req, res) => {
    const path = require('path')
    // const csv = require('csv');
    // const csvj = require('csvtojson')
    const fs = require('fs')
    const EdgePath = path.join(__dirname, '../../data/EdgeList.json')
    console.log(EdgePath);
    fs.readFile(EdgePath, 'utf8', function (err, result) {
        console.log(result);
        res.send(result)
    })
}
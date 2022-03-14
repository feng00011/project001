var tes = 'jack->mo:niubi'

var arr = tes.match(/->(\S*):/);
// console.log(arr);
// [ '->mo:', 'mo', index: 4, input: 'jack->mo:niubi', groups: undefined ]
// console.log(arr[1]);
// mo

// /(?<=XXX)\w*/：表示匹配XXX后面的字母和数字
// /\w*(?=XXX)/：表示匹配XXX前面的字母和数字
// /XXX(\S*)YYY/:表示匹配XXX和YYY之间的字母和数字
var arr2 = tes.match(/(?<=:)\w*/);
// console.log(arr2);
// [ 'niubi', index: 9, input: 'jack->mo:niubi', groups: undefined ]
// console.log(arr2[0]);
// niubi

var arr3 = tes.match(/\w*(?=->)/)
console.log(arr3[0]);
// jack

let nid = 'N1->N4:E156;N2->N1:E666'
console.log(nid.split(';'));


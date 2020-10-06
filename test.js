let reg = /(\r\n|\n|\r)/gm
let str = 'abc\r\nabc\nabc\n'
let str1 = str.replace(reg, '<br />')
console.log(str1)

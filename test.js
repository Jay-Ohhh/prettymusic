let obj1 = {
  a: 'a',
}
let obj2 = {
  a: 1,
  ...obj1, // 运算符在后
}
console.log(obj2) // { a: 'a' }

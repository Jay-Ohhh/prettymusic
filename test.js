function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    // Math.random()返回介于 0（包含） ~ 1（不包含） 之间的一个随机数
    let index = Math.floor(Math.random() * i)
    let temp = _arr[i]
    _arr[i] = _arr[index]
    _arr[index] = temp
    console.log(i)
  }
  return _arr
}
shuffle([1, 2, 3, 4])

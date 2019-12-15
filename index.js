var myArgs = process.argv.slice(2);

const str_to_int = (str) => {
  const num_hash = { '영': 0, '일': 1, '이': 2, '삼': 3, '사': 4, '오': 5, '육': 6, '칠': 7, '팔': 8, '구': 9 }
  const unit_hash = { '십': 10, '백': 100, '천': 1000, '만': 10000, '억': 100000000, '조': 1000000000000 }

  let sum = 0 
  let tmp = 0
  let num = 0

  for (let i = 0 ; i < str.length ; i++) {
    if (num_hash[str[i]]) {

      num = num_hash[str[i]]

    } else {

      if (unit_hash[str[i]] < 10000) {
        tmp += num == 0 ? unit_hash[str[i]] : (num * unit_hash[str[i]])
      } else {
        tmp += num
        sum += tmp == 0 ? unit_hash[str[i]] : (tmp * unit_hash[str[i]])
        tmp = 0
      }

      num = 0

    }
  }

  return sum + tmp + num
}

function int_to_str(num) {
  if(num == '0') {
    return '영'
  }

  const num_arr = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']
  const small_unit_arr = ['천', '백', '십', '']
  const big_unit_arr = ['', '만', '억', '조']

  const result = []
  
  let unit_counter = Math.ceil(num.length / 4)
  num = num.padStart(unit_counter * 4, '0')
    
  const array = split_string(num)
  
  unit_counter = 0
  for(let i = array.length - 1 ; i >= 0 ; i--) {
    let korean_numbering = converter_to_korean_numbering(array[i])

    if(korean_numbering != '') {
      result.unshift(korean_numbering + big_unit_arr[unit_counter])
    }

    unit_counter++
  }
  
  function split_string (num) {
    const result = []
    for (let i = 0 ; i < (num.length) / 4 ; i++) {
      result.push(num.slice(i * 4, i * 4 + 4))
    }
  
    return result
  }

  function converter_to_korean_numbering(number) {
    let str = '';
    for(let i = 0; i < number.length; i++) {
      let num = number[i]

      if(num != '0')
        str += num_arr[num] + small_unit_arr[i]
    }

    return str
  }

  return result.join('')
}


const sum = (value1, value2) => {
  let convertedValue1 = str_to_int(value1)
  let convertedValue2 = str_to_int(value2)

  return int_to_str(String(convertedValue1 + convertedValue2))
}


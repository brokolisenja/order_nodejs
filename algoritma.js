function test1(data) {
    for (let i = 0; i < data; i++) {
        let hasil = '';
        let prepLoop = data - i
        for (let k = 0; k < prepLoop; k++) {
            hasil += (data - i) - k
        }
        console.log(hasil)
    }
}

function test2(data) {
    for (let i = 1; i < data; i++) {
        let hasil = ''
        for (let k = 1; k < data; k++) {
            if ((i === 1 || (i + 1) === data) || (k === 1 || (k + 1) === data) || (k === i || (data - i) === k) ) {
                hasil += "#"
            } else {
                hasil += " "
            }
        }
        console.log(hasil)
    }
}

function test3(data) {
    let prepData = data.split(".").join("")
    for (let i = 0; i < prepData.length; i++) {
        let hasil = ''
        let prepLoops = prepData.length - i
        for (let k = 0; k < prepLoops; k++) {
            if (k === 0) {
                hasil += prepData[i]
            }else{
                hasil += 0
            }
        }
        console.log(hasil)
    }
}

test2(10)
test1(8)
test3("1.345.679")
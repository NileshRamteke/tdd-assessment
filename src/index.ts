
function add(numberList:string) {
    let sum: number = 0;
    if (numberList.trim().length === 0) {
        sum = 0;
    }
    return sum;
}

module.exports = add;
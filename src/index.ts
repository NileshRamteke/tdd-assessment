
function add(numberListStr:string): number {
    let sum: number = 0;
    if (numberListStr.trim().length === 0) {
        sum = 0;
    } else {
        const numbers = numberListStr.split(/[,]/);
        sum = numbers
                .map(num => {
                    const parsed = Number(num.trim());
                    if (isNaN(parsed)) {
                        throw new Error(`Invalid number: ${num}`);
                    }
                    return parsed;
                })
                .reduce((sum, num) => sum + num, 0);
    }
    return sum;
}

module.exports = add;
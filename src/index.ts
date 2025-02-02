function getNumbersFromChangedDelimitor(numberListStr: string):string[] {
    let numbers: string[] = [];
    const startIndex = numberListStr.indexOf("//") + 2;
    const endIndex = numberListStr.indexOf("\n", startIndex);   
    const delim = numberListStr.substring(startIndex, endIndex);
    numbers = numberListStr.split("\n")[1].split(delim);
    return numbers
}

function add(numberListStr:string): number {
    let sum: number = 0;
    let isDelimitorChanged:boolean = numberListStr.includes("//");
    if (numberListStr.trim().length === 0) {
        sum = 0;
    } else if(isDelimitorChanged) {
        const numbers = getNumbersFromChangedDelimitor(numberListStr);
        sum = numbers
                .map(num => {
                    const parsed = Number(num.trim());
                    if (isNaN(parsed)) {
                        throw new Error(`Invalid number: ${num}`);
                    }
                    if (parsed < 0) {
                        throw new Error("Negative numbers not allowed")
                    }
                    return parsed;
                })
                .reduce((sum, num) => sum + num, 0);
    } else {
        const numbers = numberListStr.split(/[,\n]/);
        sum = numbers
                .map(num => {
                    const parsed = Number(num.trim());
                    if (isNaN(parsed)) {
                        throw new Error(`Invalid number: ${num}`);
                    }
                    if (parsed < 0) {
                        throw new Error("Negative numbers not allowed")
                    }
                    return parsed;
                })
                .reduce((sum, num) => sum + num, 0);
    }
    return sum;
}

module.exports = add;
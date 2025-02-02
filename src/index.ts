function extractDelimitors(numberListStr: string): string {
    const startIndex = numberListStr.indexOf("//") + 2;
    const endIndex = numberListStr.indexOf("\n", startIndex);   
    const delim = numberListStr.substring(startIndex, endIndex);
    return delim;
}

function extractMultipleDelimitors(delimitorStr:string) {
    const matches = delimitorStr.match(/\[(.*?)\]/g) || [];
    return matches.map((match:string) => match.slice(1, -1));
}
function getNumbersFromChangedDelimitor(numberListStr: string):string[] {
    let numbers: string[] = [];
    const delim: string = extractDelimitors(numberListStr);
    const isMultipleDelims:boolean = delim.indexOf("[") > -1 && delim.indexOf("]") > -1;
    const numbersStr:string = numberListStr.split("\n")[1];
    if (isMultipleDelims) {
        const multipleDelimitors:string[] = extractMultipleDelimitors(delim);
        const escapedDelims:string[] = multipleDelimitors.map(delim => delim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        const regex:RegExp = new RegExp(escapedDelims.join('|'));
        numbers = numbersStr.split(regex);
    } else {
        numbers = numbersStr.split(delim)
    }
    return numbers;
}

function calculateSum(numbers: string[]) {
    let sum: number = 
        numbers
            .map((num:string) => {
                let parsed = Number(num.trim());
                if (isNaN(parsed)) {
                    throw new Error(`Invalid number: ${num}`);
                }
                if (parsed < 0) {
                    throw new Error("Negative numbers not allowed")
                }
                if (parsed > 1000) {
                    parsed = 0;
                }
                return parsed;
            })
            .reduce((sum, num) => sum + num, 0);
    return sum;
}

function add(numberListStr:string): number {
    let sum: number = 0;
    let isDelimitorChanged:boolean = numberListStr.includes("//");
    if (numberListStr.trim().length === 0) {
        sum = 0;
    } else if(isDelimitorChanged) {
        const numbers: string[] = getNumbersFromChangedDelimitor(numberListStr);
        sum = calculateSum(numbers);
    } else {
        const numbers = numberListStr.split(/[,\n]/);
        sum = calculateSum(numbers);
    }
    return sum;
}

module.exports = add;
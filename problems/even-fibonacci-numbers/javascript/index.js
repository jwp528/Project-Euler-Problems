const max = 4000000;// 4 million
let sequence = [1];
let sum = 0;
let value = 0;
let start = 0;

for (; ;) {
    value = (sequence.length === 1) ? (sequence[start] * 2) : (sequence[start] + sequence[start - 1]);
    if (value > max)
        break;

    sequence.push(value);
    sum += (value % 2 === 0) ? value : 0;

    start++;
}

console.log(sum);
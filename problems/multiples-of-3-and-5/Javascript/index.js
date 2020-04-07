// takes a number, and finds all multiples of that number up to a limit
const tests = [];

// this approach uses the max iteration approach
function getMultiples(num, limit) {
    let multiples = [];

    let bound = 0;
    let max = Math.floor(limit / num);

    for (let x = 1; x <= max; x++) {
        bound = x * num;

        // check again to make sure the new bound hasn't shot past our limit
        if (bound < limit) multiples.push(bound);
    }

    return multiples;
}

function findMultiplesUsingBound(num, limit, test) {
    let bound = 0;
    test.bound = {
        multiples: []
    };

    const start = new Date().getTime();

    for (let x = 1; bound < limit; x++) {
        bound = x * num;

        // check again to make sure the new bound hasn't shot past our limit
        if (bound < limit) test.bound.multiples.push(bound);
    }
    const end = new Date().getTime();
    test.bound.time = end - start;
}

function findMultiplesUsingMaxIteration(num, limit, test) {
    let bound = 0;
    test.maxIteration = {
        multiples: []
    };

    let maxIteration = Math.floor(limit / num);

    const start = new Date().getTime();

    for (let x = 1; x <= maxIteration; x++) {
        bound = x * num;

        // check again to make sure the new bound hasn't shot past our limit
        if (bound < limit) test.maxIteration.multiples.push(bound);
    }

    const end = new Date().getTime();

    test.maxIteration.time = end - start;
}

// takes a test object and calculates the sum from it's multiples
function sumMultiples(test) {
    test.bound.sum = test.bound.multiples.reduce((acc, num) => acc += num);
    test.bound.sum = test.bound.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    test.maxIteration.sum = test.maxIteration.multiples.reduce((acc, num) => acc += num);
    test.maxIteration.sum = test.maxIteration.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function addTest(num, limit) {
    let test = {
        desc: `Find multiples of ${num} below ${limit}`
    }

    if (Array.isArray(num)) {
        test.multiples = [];
        num.forEach(n => {
            const multiples = getMultiples(n, limit);
            test.multiples = test.multiples.concat(multiples);
        });

        test.sum = test.multiples.reduce((acc, num) => acc += num);
    } else {
        findMultiplesUsingBound(num, limit, test);
        findMultiplesUsingMaxIteration(num, limit, test);
        sumMultiples(test);
    }

    tests.push(test);
}

function output(test) {
    console.log(test.desc);

    if (test.bound && test.maxIteration) {
        console.log('\tBound: ', test.bound.time);
        if (test.bound.multiples.length <= 10)
            console.log('\t\tMultiples:', test.bound.multiples);
        else {
            console.log('\t\tMultiples:', test.bound.multiples.length, ' items');
            console.log('\t\tHighest Multiple:', test.bound.multiples[test.bound.multiples.length - 1]);
        }

        console.log('\t\tSum: ', test.bound.sum);

        console.log('');
        console.log('\tMax Iteration: ', test.maxIteration.time);
        if (test.maxIteration.multiples.length <= 10)
            console.log('\t\tMultiples:', test.maxIteration.multiples);
        else {
            console.log('\t\tMultiples:', test.maxIteration.multiples.length, ' items');
            console.log('\t\tHighest Multiple:', test.maxIteration.multiples[test.maxIteration.multiples.length - 1]);
        }

        console.log('\t\tSum:', test.maxIteration.sum);

        console.log('');
        console.log('=====================================================================');
        console.log('');
    } else {
        console.log('\tMultiples:', test.multiples);
        console.log('\tSum:', test.sum);

    }
}


// IIFE for execution
(() => {
    // tests
    //insert numbers to simply perform tests, insert an array for the first argument to sum everything up.
    addTest(3, 1000);
    addTest(5, 1000);
    addTest([3, 5], 1000);


    //output all results in console
    tests.forEach(test => {
        output(test);
    });
})();
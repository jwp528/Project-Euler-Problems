#include <iostream>

int main()
{
    long sum = 0;
    long value, last = 1;
    long max = 4000000;

    for (;;)
    {
        if (value > max)
            break;

        if (value % 2 == 0)
            sum += value;

        long temp = value;
        value += last;
        last = temp;
    }

    std::cout << sum << std::endl;

    return 0;
}
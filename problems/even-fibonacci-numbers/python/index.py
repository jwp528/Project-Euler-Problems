max = 4000000  # 4 million
sum = 0
value = 1
last = value

while value <= max:
    if value % 2 == 0:
        sum += value

    temp = value
    value += last
    last = temp

print(sum)

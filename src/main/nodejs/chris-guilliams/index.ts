import * as fs from 'node:fs';

const fileName = process.argv[2];

const input = fs.readFileSync(fileName, 'utf8')
const lines = input.trim().split("\n")

const map = new Map<string, number[]>

for await (const line of lines) {
    const [city, temperature] = line.split(";")
    const temp: number = [temperature].map(Number)[0]

    const entry = map.get(city)
    if (entry) {
        entry.push(temp)
    } else {
        map.set(city, [temp])
    }
}

function printCompiledResults(map: Map<string, number[]>): void {
    let output = "{"
    const entries = Array.from(map)
    const sortedEntries = entries.sort((a, b) => a[0].localeCompare(b[0]))

    for (const [key, value] of sortedEntries) {
        const temp = value[0].toFixed(1)
        output += `${key}=${temp}/${temp}/${temp}`
        output += ", "
    }

    output = output.substring(0, output.length - 2)
    output += "}"
    console.log(output);
}

printCompiledResults(map);

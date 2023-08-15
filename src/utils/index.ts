export function kelvinToCelcius(num: number) {
    return Math.round(num - 273.15)
}

export function celciusToFahrenheit(c: number) {
    return Math.round(c * (9 / 5) + 32)
}

export function fahrenheitToCelcius(f: number) {
    return Math.round(((f - 32) * 5) / 9)
}

export function kmToMile(n: number) {
    return Math.round(n / 1.60934)
}

export function mileToKm(n: number) {
    return Math.round(n * 1.60934)
}

export function pressurePaToMM(n: number) {
    return Math.round(n * 0.75006)
}

export function getTimeFromTimestamp(n: number) {
    const date = new Date(n * 1000)
    return date.toLocaleTimeString()
}

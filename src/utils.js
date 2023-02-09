export const getRandomNumber = (min, max, roundUp) => {
    let x = min + Math.random() * (max - min);
    return roundUp ? Math.floor(x) : x;
}

export default function sumArray(array: []) {
  let sum = 0;

  array.forEach((item: number) => {
    sum += item;
  });

  return sum;
}

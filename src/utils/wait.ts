export default async function wait(delayInMs: number) {
  return new Promise((resolve) => setTimeout(resolve, delayInMs));
}

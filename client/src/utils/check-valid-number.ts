export const checkValidNumber = (value: string | number) => {
  const valueChecking = value.toString();
  return /^[1-9]+$/.test(valueChecking);
}

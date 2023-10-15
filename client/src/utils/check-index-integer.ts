const locatedIndexUint = (params: string[]): number[] => {
  const indexOfInteger: number[] = [];
  params.forEach((
    element: string, 
    index: number
  ) => {
    if (element.includes('int')) {
      indexOfInteger.push(index);
    }
  });

  return indexOfInteger;
}

export const checkIntegerIndexIsValid = (
  sortedArguments: (string | number)[],
  parametersType: string[]
): boolean => {
  const indexOfInteger = locatedIndexUint(parametersType);
  const lengthOfIndexUint = indexOfInteger.length;
  const statusIsInteger = [];
  for (let index = 0; index < lengthOfIndexUint; index++) {
    statusIsInteger.push(
      !isNaN(+sortedArguments[indexOfInteger[index]])
    );
  }
  const filterStatusInteger = statusIsInteger.filter(Boolean);

  return statusIsInteger.length !== filterStatusInteger.length;;
}
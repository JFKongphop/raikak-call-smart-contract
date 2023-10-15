import { ParameterFunction } from "@/type/addressData";
import { CustomTypeArguments } from "@/type/contract-handle";

export const sortArguments = (
  params: ParameterFunction[], 
  argumentInputs: CustomTypeArguments
): (string | number)[] => {
  const paramsName: string[] = params.map((data) => data.name) || [];
  const sortedArgumentKeys: CustomTypeArguments = {};
  for (const param of paramsName) {
    sortedArgumentKeys[param] = argumentInputs[param];
  }
  const sortedArguments = Object.values(sortedArgumentKeys);

  return sortedArguments;
}
import type { 
  FieldValues, 
  UseFormRegister, 
  UseFormWatch 
} from "react-hook-form";

export type RegisterProps<T extends FieldValues> = unknown & UseFormRegister<T>;
export type WatchProps<T extends FieldValues> = unknown & UseFormWatch<T>;
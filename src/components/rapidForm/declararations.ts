export interface BaseInputProps {
    name: string,
    label?: string;
}

export type PrimativeType = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
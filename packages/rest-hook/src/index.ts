export { RestHookProvider } from "./providers/RestHookProvider";
export { CreateRestHook } from "./core/CreateApi";
export { ReactQueryDevtools as RestHookDevtools } from "@tanstack/react-query-devtools";
export { useQueryClient as useRestHook } from "@tanstack/react-query";
export interface RegisterErrorDto {}
export interface RegisterOtherBaseUrls {}
export type { RHookTypeHelper, RHookMethodTypeHelper } from "./types/types";

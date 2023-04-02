import { CreateRestHook } from './core'
export { RestHookProvider } from './providers'
export type { RHookTypeHelper, RHookMethodTypeHelper } from './types'
export { ReactQueryDevtools as RestHookDevtools } from '@tanstack/react-query-devtools'
export { useQueryClient as useRestHook } from '@tanstack/react-query'
export interface RegisterErrorDto {}
export interface RegisterOtherBaseUrls {}
export default CreateRestHook

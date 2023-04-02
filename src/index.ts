export { CreateRestHook } from './core/CreateApi'
import { RestHookProvider } from './providers/RestHookProvider'
export type { RHookTypeHelper, RHookMethodTypeHelper } from './types'
export { ReactQueryDevtools as RestHookDevtools } from '@tanstack/react-query-devtools'
export { useQueryClient as useRestHook } from '@tanstack/react-query'
export interface RegisterErrorDto {}
export interface RegisterOtherBaseUrls {}
export default RestHookProvider

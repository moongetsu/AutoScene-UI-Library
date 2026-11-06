/** What the app's commands throw (`AppError` in bindings.ts), as far as this file needs it. */
type CodedError = { code: string; message: string }

/** Commands throw `AppError` objects; anything else is an unexpected failure. */
export function isAppError(e: unknown): e is CodedError {
  return typeof e === "object" && e !== null && "code" in e && "message" in e
}

/** Human-readable message for any thrown value. */
export function errorMessage(e: unknown): string {
  if (isAppError(e)) return e.message
  if (e instanceof Error) return e.message
  return String(e)
}

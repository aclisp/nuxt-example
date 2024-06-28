export function directusErrorMessage(error: unknown) {
  return isDirectusError(error)
    ? extractDirectusError(error)?.errors[0].message
    : isError(error)
      ? extractError(error)?.message
      : String(error)
}

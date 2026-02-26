export function debounce<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  wait = 300
): (...args: TArgs) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: TArgs) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => fn(...args), wait);
  };
}

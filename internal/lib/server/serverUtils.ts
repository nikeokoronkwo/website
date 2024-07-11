export function convertSearchParams(searchParams: URLSearchParams) {
  const obj: Record<string, any> = {};
  for (const p of searchParams) {
    const key = p[0];
    let value: any = p[1];
    if (value === "") value = "";
    if (value === "true") value = true;
    if (value === "false") value = false;
    else {
      try {
        value = parseInt(value);
      } catch (_) {
        try {
          value = parseFloat(value);
        } catch (_) { /* Do nothing */ }
      }
    }
    Object.defineProperty(obj, key, { value, writable: false });
  }

  return obj;
}

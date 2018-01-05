export function capitalize(string) {
  if (string.length > 0 && typeof string !== 'undefined') {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

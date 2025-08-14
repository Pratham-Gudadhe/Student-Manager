export function normalizeName(s) {
  return s
    .normalize('NFD') 
    .replace(/[\u0300-\u036f]/g, '') 
    .toLowerCase();
}

export function isFuzzyMatch(a, b) {
  a = normalizeName(a);
  b = normalizeName(b);

  if (a === b) return true;

  if (Math.abs(a.length - b.length) > 1) return false;

  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
    } else {
      edits++;
      if (edits > 1) return false;
      if (a.length > b.length) i++;
      else if (a.length < b.length) j++;
      else {
        i++;
        j++;
      }
    }
  }

  return true;
}
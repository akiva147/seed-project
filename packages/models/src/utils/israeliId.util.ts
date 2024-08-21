/**
 * @borrows https://gist.github.com/freak4pc/6802be89d019bca57756a675d761c5a8
 * @param id
 * @returns if id is valid israeli id
 */

export function isValidIsraeliID(id: string) {
  if (id.length > 9 || id.length < 5) return false;

  // Pad string with zeros up to 9 digits
  id = id.length < 9 ? ("00000000" + id).slice(-9) : id;

  return (
    Array.from(id, Number).reduce((counter, digit, i) => {
      const step = digit * ((i % 2) + 1);
      return counter + (step > 9 ? step - 9 : step);
    }) %
      10 ===
    0
  );
}

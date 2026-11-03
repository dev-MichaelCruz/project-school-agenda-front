export function matchesSearch(value: string, query: string): boolean {
  const normalize = (text: string) =>
    text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');

  return normalize(value).includes(normalize(query.trim()));
}

export function MakeId(Prefix = "Id"): string {
  // Good enough for dev; later you can swap to UUID/DB ids
  return `${Prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}
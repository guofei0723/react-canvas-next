const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function randomChars(count = 6) {
  return Array(count).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
}

let idNum = 0;
/**
 * create an ID
 */
export function makeID(): string {
  return `${randomChars()}-${++idNum}`;
}

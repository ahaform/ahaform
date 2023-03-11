export function uuid(): string {
    const s = [];
    const hexDigits = "0123456789abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 22; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    return s.join("");
}

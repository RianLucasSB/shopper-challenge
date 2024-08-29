export function isValidBase64(base64: string) {
  if (typeof base64 !== 'string' || base64.trim() === '') {
      return false;
  }

  const database64Pattern = /^data:(\w+\/\w+);base64,(.+)$/;

  const match = base64.match(database64Pattern);

  if (!match) {
      return false;
  }

  const base64Data = match[2];

  return isBase64(base64Data);
}

function isBase64(base64: string) {
  if (base64 === '' || base64 === null) return false;

  const base64Pattern = /^[A-Za-z0-9+/=]+$/;
  if (!base64Pattern.test(base64)) return false;
  return true;
}
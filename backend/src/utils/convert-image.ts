export function base64ToBlob(base64Image: string) {
  // Converte a base64 em um Blob
  const byteCharacters = atob(base64Image.split(',')[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    byteArrays.push(new Uint8Array(byteNumbers));
  }

  return new Blob(byteArrays, { type: 'image/png' }); // Ajuste o tipo conforme necessário
}

const signatures = {
  JVBERi0: 'application/pdf',
  R0lGODdh: 'image/gif',
  R0lGODlh: 'image/gif',
  iVBORw0KGgo: 'image/png',
  '/9j/': 'image/jpg',
};

export const getMimeType = (base64: string) => {
  for (const sign in signatures) if (base64.startsWith(sign)) return signatures[sign as keyof typeof signatures];
};

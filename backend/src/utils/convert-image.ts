export function base64ToFile(base64Image: string) {
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

  const blob = new Blob(byteArrays, { type: 'image/png' }); // Ajuste o tipo conforme necessário

  // Cria um File a partir do Blob
  return new File([blob], "measurement", { type: 'image/png' }); // Ajuste o tipo conforme necessário
}
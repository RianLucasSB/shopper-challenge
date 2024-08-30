"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMimeType = void 0;
exports.base64ToBlob = base64ToBlob;
function base64ToBlob(base64Image) {
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
const getMimeType = (base64) => {
    for (const sign in signatures)
        if (base64.startsWith(sign))
            return signatures[sign];
};
exports.getMimeType = getMimeType;

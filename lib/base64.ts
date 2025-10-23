// Small cross-platform base64 encoder that accepts a wider range of inputs than @smithy/util-base64's toBase64
// Accepts: string, Uint8Array, ArrayBuffer, Buffer, number[], object (JSON-stringified)

export type Base64Input = string | Uint8Array | ArrayBuffer | number[] | unknown;

function isUint8Array(v: any): v is Uint8Array {
  return v && v.constructor && v.constructor.name === 'Uint8Array';
}

function isArrayBuffer(v: any): v is ArrayBuffer {
  return Object.prototype.toString.call(v) === '[object ArrayBuffer]';
}

export function encodeBase64(input: Base64Input): string {
  if (typeof input === 'string') {
    // In browser, need to use btoa with binary string. Using Buffer when available keeps Node+Next consistent.
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(input, 'utf8').toString('base64');
    }
    // fallback to btoa
    try {
      return btoa(unescape(encodeURIComponent(input)));
    } catch (e) {
      // as a last resort, JSON stringify
      return btoa(String(input));
    }
  }

  if (isUint8Array(input)) {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(input).toString('base64');
    }
    // Browser: convert Uint8Array to binary string
    let binary = '';
    for (let i = 0; i < input.length; i++) {
      binary += String.fromCharCode(input[i]);
    }
    return btoa(binary);
  }

  if (isArrayBuffer(input)) {
    return encodeBase64(new Uint8Array(input));
  }

  if (Array.isArray(input) && input.every((n) => typeof n === 'number')) {
    return encodeBase64(new Uint8Array(input as number[]));
  }

  // fallback: stringify objects or other values
  return encodeBase64(JSON.stringify(input));
}

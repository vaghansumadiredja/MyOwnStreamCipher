import { EncryptExtendedVigenere } from "./ex-vigenere";

function KSA(K: string) {
  let S: number[] = [0]
  let j = 0
  for (let i = 1; i < 256; i++) {
    S.push(i)
  }
  for (let i = 0; i < 256; i++) {
    j = (j + S[i] + K.charCodeAt(i % K.length)) % 256;
    [S[i], S[j]] = [S[j], S[i]];
  }

  let string = String.fromCharCode(...S)
  let out = EncryptExtendedVigenere(K, string)
  let outArr = []
  for (let i = 0; i < 256; i++) {
    outArr.push(out.charCodeAt(i))
  }
  return outArr
}

export function EncryptModifiedRC4(P: string, K: string) {
  let i = 0
  let j = 0
  let S = KSA(K)
  let C = ""
  for (let idx = 0; idx < P.length; idx++) {
    i = (i + 1) % 256
    j = (j + S[i]) % 256;
    [S[i], S[j]] = [S[j], S[i]];
    C += String.fromCharCode(((P.charCodeAt(idx) ^ S[(S[i] + S[j]) % 256])) % 256)
  }
  return C
}
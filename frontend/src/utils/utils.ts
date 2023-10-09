import CryptoJS from 'crypto-js';
import { ENCRYPTION_KEY } from '../constants';

export const decryptData = (encryptedData: string) => {
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
  return decryptedData;
};

export const encryptData = (dataToEncrypt: string) => {
  const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, ENCRYPTION_KEY).toString();
  return encryptedData;
};

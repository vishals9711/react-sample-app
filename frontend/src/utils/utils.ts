import CryptoJS from 'crypto-js';
import { ENCRYPTION_KEY } from '../constants';

/**
 * Decrypts encrypted data using AES encryption with the provided encryption key.
 *
 * @param {string} encryptedData - The encrypted data to decrypt.
 * @returns {string} - The decrypted data as a UTF-8 string.
 */
export const decryptData = (encryptedData: string) => {
  // Decrypt the data using AES decryption and convert it to a UTF-8 string.
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
  return decryptedData;
};

/**
 * Encrypts data using AES encryption with the provided encryption key.
 *
 * @param {string} dataToEncrypt - The data to encrypt.
 * @returns {string} - The encrypted data as a string.
 */
export const encryptData = (dataToEncrypt: string) => {
  // Encrypt the data using AES encryption and return it as a string.
  const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, ENCRYPTION_KEY).toString();
  return encryptedData;
};

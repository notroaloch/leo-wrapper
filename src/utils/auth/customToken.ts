import {
  AUTH_CUSTOM_TOKEN_DATE_LOCALE,
  AUTH_CUSTOM_TOKEN_DATE_LOCALE_FORMAT,
  AUTH_CUSTOM_TOKEN_DATE_REGEXP,
  AUTH_CUSTOM_TOKEN_DATE_REGEXP_REPLACE,
  AUTH_CUSTOM_TOKEN_UNIQUE_CHAR,
} from './index';

// Gets the current timestamp and formats it as DDMMYYYYHHMMSSS
export const getFormattedTimestamp = (): string => {
  const LOCALE = AUTH_CUSTOM_TOKEN_DATE_LOCALE;
  const FORMAT = AUTH_CUSTOM_TOKEN_DATE_LOCALE_FORMAT;
  const REGEXP = AUTH_CUSTOM_TOKEN_DATE_REGEXP;
  const REGEXP_REPLACE = AUTH_CUSTOM_TOKEN_DATE_REGEXP_REPLACE;

  const now = new Date();
  const dateStr = now.toLocaleDateString(LOCALE, FORMAT);
  const formattedDate = dateStr.replace(REGEXP, REGEXP_REPLACE);

  return formattedDate;
};

// Custom encryption algorithm (based on Leo Source Code)
// MAY CHANGE OVER TIME

export const encryptPhrase = (phrase: string, key: string): string => {
  const MIN = 33;
  const MAX = 44;
  const CONST = 122;
  const UNIQUE_CHAR = AUTH_CUSTOM_TOKEN_UNIQUE_CHAR;

  const phraseLength = phrase.length;
  const randomInt = Math.floor(Math.random() * (MAX - MIN) + MIN);
  const randomInt2 = CONST - randomInt + 1;

  let cypherKey = '';
  let encryptedPhrase = '';
  let unicodeCharValue;

  for (let i = Math.floor(phraseLength / key.length + 1); i > 0; i--) {
    cypherKey += key;
  }
  cypherKey = cypherKey.substring(0, phraseLength);

  for (let i = 0; i < phraseLength; i++) {
    unicodeCharValue =
      phrase.charCodeAt(i) - randomInt + cypherKey.charCodeAt(i) - randomInt;
    encryptedPhrase += String.fromCharCode(
      (unicodeCharValue % randomInt2) + randomInt
    );
  }

  encryptedPhrase =
    encryptedPhrase + UNIQUE_CHAR + String.fromCharCode(randomInt);

  return encryptedPhrase;
};

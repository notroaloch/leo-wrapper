// AUTH TOKEN CONSTANTS
export const PASSWORD_HASH_SALT_ROUNDS: number = 10;

// CUSTOM TOKEN CONSTANTS
export const AUTH_CUSTOM_TOKEN_CYPHER_KEY: string = 'KEY2H0l4l30';
export const AUTH_CUSTOM_TOKEN_BASE_PHRASE: string = 'secretKey:key:crypto';
export const AUTH_CUSTOM_TOKEN_UNIQUE_CHAR: string = '~';
export const AUTH_CUSTOM_TOKEN_DATE_LOCALE: string = 'en-GB';

export const AUTH_CUSTOM_TOKEN_DATE_LOCALE_FORMAT: Intl.DateTimeFormatOptions =
  {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
    timeZone: 'GMT-0',
  };

export const AUTH_CUSTOM_TOKEN_DATE_REGEXP: RegExp =
  /(\d{1,2})\/(\d{1,2})\/(\d{4}),\s(\d{1,2}):(\d{1,2}):(\d{2})[.,](\d{3})/;

export const AUTH_CUSTOM_TOKEN_DATE_REGEXP_REPLACE: string = '$1$2$3$4$5$6$7';

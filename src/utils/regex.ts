// example@email.com
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Bob or Bob Jones
export const NAME_REGEX = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

// 5 digits, comma separated 50504 or 50504, 50505
export const ZIP_CODE_REGEX = /^(\d{5})(,\s*\d{5})*$/;

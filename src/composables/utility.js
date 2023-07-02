export function isEmpty(obj) {
  return Object.values(obj).every(val => val == '' || val == null || val == undefined);
}

export function allowDigitOnly(event) {
  if (event.key.match(/[^\d.]/g) && event.key !== 'Backspace' && event.key !== 'Tab') {
    event.preventDefault();
  }
}

// export function exists(value) {
//   return value != null && value != undefined && value.trim() != '';
// }

// export function isNumber(value) {
//   return /^\d+$/.test(value);
// }

// export function isContactNo(value) {
//   return /^\d{4}-\d{7}$/.test(value);
// }

// export function isCNIC(value) {
//   return /^\d{5}-\d{7}-\d$/.test(value);
// }

// export function isContactNoOrEmpty(value) {
//   return /^(\d{4}-\d{7})?$/.test(value);
// }

// export function isCNICOrEmpty(value) {
//   return /^(\d{5}-\d{7}-\d)?$/.test(value);
// }

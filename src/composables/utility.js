export function isEmpty(obj) {
  return Object.values(obj).every(val => val == '' || val == null || val == undefined);
}

export function allowDigitOnly(event) {
  if (event.key.match(/[^\d.]/g) && event.key !== 'Backspace' && event.key !== 'Tab') {
    event.preventDefault();
  }
}

export function titleizeCamelCase(value) {
  if (value == null || value == undefined) return '';
  if (value.length) {
    value = value.replace(/[A-Z]/g, m => ` ${m}`);
    value = value.charAt(0).toUpperCase() + value.slice(1);
  }
  return value;
}

export function toCamelCase(value) {
  if (value == null || value == undefined) return '';
  if (value.length) {
    value = value.replace(/^.|\s/g, m => (+m == 0 ? '' : m.toLowerCase()));
  }
  return value;
}

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};
export function formatDate(date) {
  return new Date(date).toLocaleString(undefined, options);
}

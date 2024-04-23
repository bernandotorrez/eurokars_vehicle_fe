import moment from 'moment-timezone';

export const objectToQueryString = (obj) => {
  let str = '';
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      for (let subKey in obj[key]) {
        str += `${key}[${subKey}]=${obj[key][subKey]}&`;
      }
    } else {
      str += `${key}=${obj[key]}&`;
    }
  }
  // Remove the trailing '&' character
  str = str.slice(0, -1);
  return str;
}

export const formatCurrency = (amount) => {
  return amount.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR'
  });
}

export const formatDate = (date) => {
  return moment(date).tz('Asia/Bangkok').format('DD-MM-YYYY HH:mm:ss');
}
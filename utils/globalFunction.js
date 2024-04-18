export const objectToQueryString = (query) => {
  let queryString = '';

  for (const key in query) {
    if (Object.hasOwnProperty.call(query, key)) {
      const obj = query[key];
      for (const prop in obj) {
        if (Object.hasOwnProperty.call(obj, prop)) {
          queryString += `${key}[${prop}]=${obj[prop]}&`;
        }
      }
    }
  }
  
  // Remove the trailing '&'
  queryString = queryString.slice(0, -1);

  return queryString;
}

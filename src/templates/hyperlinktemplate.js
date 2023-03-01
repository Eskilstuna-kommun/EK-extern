import helpers from '../utils/templatehelpers';

export default (properties) => {
  const els = `${
    helpers.each(properties, obj => {
      if (obj.value.startsWith('https://')) {
        return `<li><b>Länk</b> : <a href="${obj.value}" target="_blank">${obj.prop}</a></li>`;
      }
      return `<li><b>${obj.prop}</b> : ${obj.value}</li>`;
    })
  }`;
  return els;
};

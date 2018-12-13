// import "./Array.extend";
/* eslint-disable */

function toString(obj) {
  return Object.prototype.toString.call(obj);
}
function isType(type) {
  return function (target) {
    return toString(target) === `[object ${type}]`
  }
}

const isString = isType('String');
const isObject = isType('Object');
const isArray = isType('Array');
const isBoolean = isType('Boolean');
const isEmptyObj = function (obj) {
  if(!obj) return true;
  return !Object.keys(obj).length;
}
const isWx = function () {
  const ua = window.navigator.userAgent.toLowerCase();
  if(ua.indexOf('micromessenger') < 0){
    return false;
  }
  return true;
}
export default {
    queryString: function () {
        return window.location.search.substring(1).split('&').reduce((p,next) =>{
            const [k,v] = next.split('=')
            p[k] = v;
            return p;
        }, {})
    },
  isEmptyObj,
  isString,
  isObject,
  isBoolean,
  isArray,
  isWx
}

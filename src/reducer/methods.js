import lodashSet from "lodash/set";
import unset from "lodash/unset";
import isArray from "lodash/isArray";

export function setMany(state, items, idKey, path, validate) {
  items.forEach(item => {
    setOne(state, item, idKey, path, validate);
  })
}

export function setOne(state, item, idKey, path, validate) {
  validate(item);

  if(validate.errors) {
    console.warn({ item, errors: validate.errors });
  }

  if(idKey) {
    const id = item[idKey];
    lodashSet(state, [...path, id], item);
  } else {
    lodashSet(state, path, item)
  }
}

export function set(state, data, idKey, path, validate) {
  if(idKey && isArray(data)) {
    setMany(state, data, idKey, path, validate);
  } else {
    setOne(state, data, idKey, path, validate);
  }
}

export function remove(state, data, idKey, path) {
  if(isArray(data)) {
    data.forEach(id => {
      unset(state, [...path, id])
    });
  } else if(data) {
    unset(state, [...path, data])
  } else {
    unset(state, path)
  }
}

import Ajv from "ajv";
import isString from "lodash/isString";
import schema from "../schema.json";

const ajv = new Ajv({ useDefaults: "empty", removeAdditional: "failing" })

ajv.addKeyword("resource", {
  compile: (args) => {
    return (data, path, parentData) => {
      const p = path.split(".");
      const i = p.length - 1;
      const key = p[i];

      if(isString(args)) {
        parentData[key] = { name: args };
      } else {
        parentData[key] = args;
      }
      return true;
    }
  },
  modifying: true,
});

const validate = ajv.compile(schema);

function mapResources(state, acc={}, path=[]) {
  const keys = Object.keys(state);
  keys.forEach(key => {
    const name = state[key].name;
    if(name) {
      acc[name] = { path: [...path, key], ...state[key] };
    } else {
      mapResources(state[key], acc, [...path, key]);
    }
  });
  return acc;
}


let state = {};
validate(state);
const resources = mapResources(state);

export default resources;

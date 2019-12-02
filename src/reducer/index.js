import produce from "immer"
import Ajv from "ajv";
import noop from "lodash/noop";
import get from "lodash/get";
import rehydrate from "./rehydrate";
import resources from "./resources";
import * as methods from "./methods";
import schema from "../schema.json";

const ajv = new Ajv({ useDefaults: "empty", removeAdditional: "failing" })

ajv.compile(schema);

// Validate model from schema
const getValidationFunction = (model) => {
  const validate = model
    ? ajv.getSchema(`metron.schema.json#/definitions/${model}`)
    : noop;

  return data => {
    validate(data);
    return data;
  }
};

const reducePayload = (draft, payload, resource, method) => {
  const { path, model, idKey } = resources[resource];
  const validate = getValidationFunction(model);

  methods[method](draft, payload, idKey, path, validate)
}

const reducer = name => (state, action) => {
  const { payload } = action;
  return produce(state, draft => {
    if(typeof draft === "undefined") {
      return draft = rehydrate(name);
    }
    if("CLEAR_API" === action.type) {
      return draft = rehydrate(name, true);
    }

    if(action.meta && action.meta.reducer) {
      const { resource, method } = action.meta.reducer;
      reducePayload(draft, payload, resource, method);
    } else if(action.meta && action.meta.reducers) {
      action.meta.reducers.forEach(({ resource, method, path }) => {
        const subPayload = path ? get(payload, path) : payload;
        reducePayload(draft, subPayload, resource, method);
      });
    } else {
      return draft;
    };
  });
};

export { resources, methods };
export default reducer;

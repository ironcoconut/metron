import Ajv from "ajv";
import schema from "../schema.json";

const ajv = new Ajv({ useDefaults: "empty", removeAdditional: "failing" })
const validate = ajv.compile(schema);

const rehydrate = (name, reset=false) => {
  let initialState;
  if(reset) {
    initialState = {};
  } else {
    initialState = JSON.parse(
      window.localStorage.getItem(name)
    ) || {};
  }

  validate(initialState);
  return initialState;
};

export default rehydrate;

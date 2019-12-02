import Ajv from "ajv";
import schema from "../schema.json";
import cloneDeep from "lodash/cloneDeep";
import debounce from "lodash/debounce";

const ajv = new Ajv({ useDefaults: "empty", removeAdditional: "failing" })

ajv.addKeyword("blacklist", {
  compile: (...args) => (data, path, parentData) => {
    const key = path.split(".")[1];
    delete parentData[key];
    return true;
  },
  modifying: true,
});

const validate = ajv.compile(schema);

function setName(name) {
  function persistState(state) {
    const copy = cloneDeep(state);
    validate(copy);
    window.localStorage.setItem(name, JSON.stringify(copy));
  }

  return debounce(persistState, 250);
};

export default setName;

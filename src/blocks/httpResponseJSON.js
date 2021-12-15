import * as Blockly from "blockly/core";

const getHttpResponseJSONField = {
  type: "get_http_response_json",
  message0: "Get response JSON",
  inputsInline: true,
  output: "dict",
  colour: 65,
  tooltip: "Get HTTP response JSON",
  helpUrl: "https://docs.giosg.com",
};

Blockly.Blocks["get_http_response_json_field"] = {
  init: function () {
    this.jsonInit(getHttpResponseJSONField);
  },
};

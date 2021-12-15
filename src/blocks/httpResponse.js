import * as Blockly from "blockly/core";

const getHttpResponseField = {
  type: "get_http_response",
  message0: "Get HTTP response",
  output: "http_response",
  colour: 65,
  tooltip: "Get HTTP response",
  helpUrl: "https://docs.giosg.com",
};

Blockly.Blocks["get_http_response_field"] = {
  init: function () {
    this.jsonInit(getHttpResponseField);
  },
};

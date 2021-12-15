import * as Blockly from "blockly/core";

const getHttpResponseStatusCodeField = {
  type: "get_http_status_code",
  message0: "Get response status code",
  output: "Number",
  colour: 65,
  tooltip: "Get HTTP response status code",
  helpUrl: "https://docs.giosg.com",
};

Blockly.Blocks["get_http_status_code_field"] = {
  init: function () {
    this.jsonInit(getHttpResponseStatusCodeField);
  },
};

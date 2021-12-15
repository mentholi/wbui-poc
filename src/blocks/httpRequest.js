import * as Blockly from "blockly/core";

const httpRequestBlock = {
  type: "http_request",
  message0:
    "Url %1 Method %2 %3 %4 Authorization: %5 Header name %6 %7 Header value %8 %9 Payload %10 %11 On complete: %12 %13",
  args0: [
    {
      type: "input_value",
      name: "url",
      check: "String",
    },
    {
      type: "field_dropdown",
      name: "method",
      options: [
        ["GET", "GET"],
        ["POST", "POST"],
        ["PUT", "PUT"],
        ["PATCH", "PATCH"],
        ["DELETE", "DELETE"],
        ["OPTIONS", "OPTIONS"],
        ["HEAD", "HEAD"],
      ],
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_dummy",
    },
    {
      type: "field_input",
      name: "auth_header_name",
      text: "Authorization",
    },
    {
      type: "input_value",
      name: "auth_header_name",
      check: "String",
    },
    {
      type: "input_value",
      name: "auth_header_value",
      check: "String",
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_value",
      name: "payload",
      check: ["Array", "String", "dict"],
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_statement",
      name: "on_complete",
    },
  ],
  inputsInline: false,
  previousStatement: null,
  nextStatement: null,
  colour: 65,
  tooltip: "Make HTTP request to external systems",
  helpUrl: "https://docs.giosg.com",
};

Blockly.Blocks["http_request_field"] = {
  init: function () {
    this.jsonInit(httpRequestBlock);
  },
};

import * as Blockly from "blockly/core";

var entrypointBlock = {
  type: "entry_point_block",
  message0: "Start %1",
  args0: [{ type: "field_entrypoint", name: "FIELD" }],
  nextStatement: null,
};

Blockly.Blocks["entry_point_block"] = {
  init: function () {
    this.jsonInit(entrypointBlock);
    this.setColour("red");
  },
};

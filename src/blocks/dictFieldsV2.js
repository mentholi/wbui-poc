import * as Blockly from "blockly/core";

Blockly.Blocks["dicts_create_with_container_v2"] = {
  /**
   * Dictionary block container
   * @this Blockly.Block
   */
  init: function () {
    this.setColour(65);
    this.appendDummyInput().appendField("Object");
    this.appendStatementInput("STACK");
    this.setTooltip("Add keys to object");
    this.contextMenu = false;
  },
};

Blockly.Blocks["dicts_create_with_item_v2"] = {
  // Add items.
  init: function () {
    this.setColour(65);
    this.appendDummyInput().appendField("Key");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("New object key");
    this.contextMenu = false;
  },
};
Blockly.Blocks["dicts_create_with_v2"] = {
  /**
   * Block for creating a dict with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function () {
    this.setInputsInline(false);
    this.setColour(65);
    this.itemCount_ = 1;
    this.updateShape_();
    this.setOutput(true, "dict");
    this.setMutator(new Blockly.Mutator(["dicts_create_with_item_v2"]));
    this.setTooltip("Create new object");
  },
  /**
   * Create XML to represent dict inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function (workspace) {
    var container = document.createElement("mutation");
    container.setAttribute("items", this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the dict inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function (xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute("items"), 10);
    this.updateShape_();
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function () {
    // Delete everything.
    if (this.getInput("EMPTY")) {
      this.removeInput("EMPTY");
    }
    var keyNames = [];
    for (let i = 0; this.getInput("VALUE" + i); i++) {
      //this.getInput('VALUE' + i).removeField("KEY"+i);
      keyNames.push(this.getFieldValue("KEY" + i));
      this.removeInput("VALUE" + i);
    }
    // Rebuild block.
    if (this.itemCount_ === 0) {
      this.appendDummyInput("EMPTY").appendField("Create empty object");
    } else {
      this.appendDummyInput("EMPTY").appendField("Create object");
      for (let x = 0; x < this.itemCount_; x++) {
        this.appendValueInput("VALUE" + x)
          .setCheck(null)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(
            new Blockly.FieldTextInput(
              keyNames.length > x ? keyNames[x] : "Key"
            ),
            "KEY" + x
          )
          .appendField(":");
      }
    }
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function (workspace) {
    var containerBlock = workspace.newBlock("dicts_create_with_container_v2");
    containerBlock.initSvg();
    var connection = containerBlock.getInput("STACK").connection;
    for (var x = 0; x < this.itemCount_; x++) {
      var itemBlock = workspace.newBlock("dicts_create_with_item_v2");
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function (containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock("STACK");
    // Count number of inputs.
    var connections = [];
    var i = 0;
    while (itemBlock) {
      connections[i] = itemBlock.valueConnection_;
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
      i++;
    }
    this.itemCount_ = i;
    this.updateShape_();
    // Reconnect any child blocks.
    for (let x = 0; x < this.itemCount_; x++) {
      if (connections[x]) {
        this.getInput("VALUE" + x).connection.connect(connections[x]);
      }
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function (containerBlock) {
    // Store a pointer to any connected child blocks.
    var itemBlock = containerBlock.getInputTargetBlock("STACK");
    var x = 0;
    while (itemBlock) {
      var value_input = this.getInput("VALUE" + x);
      itemBlock.valueConnection_ =
        value_input && value_input.connection.targetConnection;
      x++;
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
  },
};

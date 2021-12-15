import * as Blockly from "blockly/core";

const dictItemField = {
  type: "dict_item",
  message0: "Set %1 to %2",
  args0: [
    {
      type: "input_value",
      name: "dict_key",
      check: "String",
    },
    {
      type: "input_value",
      name: "dict_key_value",
    },
  ],
  inputsInline: true,
  output: "String",
  colour: 65,
  tooltip: "Set value of key in object",
  helpUrl: "https://docs.giosg.com",
};

Blockly.Blocks["dict_item"] = {
  init: function () {
    this.jsonInit(dictItemField);
  },
};

const getDictItemField = {
  type: "get_dict_item",
  message0: "Get %1 in %2",
  args0: [
    {
      type: "input_value",
      name: "dict_key",
      check: "String",
    },
    {
      type: "input_value",
      name: "source_dict",
      check: "dict",
    },
  ],
  inputsInline: true,
  output: "String",
  colour: 65,
  tooltip: "Get value of key in object",
  helpUrl: "https://docs.giosg.com",
};

Blockly.Blocks["get_dict_item"] = {
  init: function () {
    this.jsonInit(getDictItemField);
  },
};

Blockly.Blocks["dict_create_with_container"] = {
  /**
   * Mutator block for dict container.
   * @this {Block}
   */
  init: function () {
    this.setColour(65);
    this.appendDummyInput().appendField("Object");
    this.appendStatementInput("STACK");
    this.setTooltip(
      "Add, remove, or reorder sections to reconfigure this list block."
    );
    this.contextMenu = false;
  },
};

Blockly.Blocks["dict_create_with_item"] = {
  /**
   * Mutator block for adding items.
   * @this {Block}
   */
  init: function () {
    this.setColour(65);
    this.appendDummyInput().appendField("Item");

    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Add an key to the object.");
    this.contextMenu = false;
  },
};

Blockly.Blocks["dict_create_with"] = {
  /**
   * Block for creating a dict with any number of elements of any type.
   * @this {Block}
   */
  init: function () {
    this.setHelpUrl("https://docs.giosg.com");
    this.setColour(65);
    this.itemCount_ = 3;
    this.updateShape_();
    this.setOutput(true, "dict");
    this.setMutator(new Blockly.Mutator(["dict_create_with_item"]));
    this.setTooltip("Create object");
  },
  /**
   * Create XML to represent list inputs.
   * Backwards compatible serialization implementation.
   * @return {!Element} XML storage element.
   * @this {Block}
   */
  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement("mutation");
    container.setAttribute("items", this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * Backwards compatible serialization implementation.
   * @param {!Element} xmlElement XML storage element.
   * @this {Block}
   */
  domToMutation: function (xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute("items"), 10);
    this.updateShape_();
  },
  /**
   * Returns the state of this block as a JSON serializable object.
   * @return {{itemCount: number}} The state of this block, ie the item count.
   */
  saveExtraState: function () {
    return {
      itemCount: this.itemCount_,
    };
  },
  /**
   * Applies the given state to this block.
   * @param {*} state The state to apply to this block, ie the item count.
   */
  loadExtraState: function (state) {
    this.itemCount_ = state["itemCount"];
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Workspace} workspace Mutator's workspace.
   * @return {!Block} Root block in mutator.
   * @this {Block}
   */
  decompose: function (workspace) {
    const containerBlock = workspace.newBlock("dict_create_with_container");
    containerBlock.initSvg();
    let connection = containerBlock.getInput("STACK").connection;
    for (let i = 0; i < this.itemCount_; i++) {
      const itemBlock = workspace.newBlock("dict_create_with_item");
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Block} containerBlock Root block in mutator.
   * @this {Block}
   */
  compose: function (containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock("STACK");
    // Count number of inputs.
    const connections = [];
    while (itemBlock && !itemBlock.isInsertionMarker()) {
      connections.push(itemBlock.valueConnection_);
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (let i = 0; i < this.itemCount_; i++) {
      const connection = this.getInput("ADD" + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) === -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (let i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, "ADD" + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Block} containerBlock Root block in mutator.
   * @this {Block}
   */
  saveConnections: function (containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock("STACK");
    let i = 0;
    while (itemBlock) {
      const input = this.getInput("ADD" + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
      i++;
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this {Block}
   */
  updateShape_: function () {
    if (this.itemCount_ && this.getInput("EMPTY")) {
      this.removeInput("EMPTY");
    } else if (!this.itemCount_ && !this.getInput("EMPTY")) {
      this.appendDummyInput("EMPTY").appendField("Create empty object");
    }
    // Add new inputs.
    for (let i = 0; i < this.itemCount_; i++) {
      if (!this.getInput("ADD" + i)) {
        const input = this.appendValueInput("ADD" + i).setAlign(
          Blockly.ALIGN_RIGHT
        );
        if (i === 0) {
          input.appendField("create object with");
        }
      }
    }
    // Remove deleted inputs.
    for (let i = this.itemCount_; this.getInput("ADD" + i); i++) {
      this.removeInput("ADD" + i);
    }
  },
};

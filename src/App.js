/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Main React component that includes the Blockly component.
 * @author samelh@google.com (Sam El-Husseini)
 */

import React from "react";
import "./App.css";

import BlocklyComponent, {
  Block,
  Value,
  Field,
  Shadow,
  Category,
} from "./Blockly";

import BlocklyJS from "blockly/javascript";

import convert from "xml-js";

import "./blocks/customblocks";
import "./generator/generator";

window.BlocklyJS = BlocklyJS;

window.USE_JSON_FORMAT = true;

function saveWorkspace() {
  const xml = getWorkspaceXml();
  const xmlText = window.BlocklyAPI.Xml.domToText(xml);
  if (window.USE_JSON_FORMAT) {
    localStorage.setItem("workspace", workspaceToJson());
  } else {
    localStorage.setItem("workspace", xmlText);
  }
}
window.saveWorkspace = saveWorkspace;

function workspaceToJson() {
  const xml = getWorkspaceXml();
  const xmlText = window.BlocklyAPI.Xml.domToText(xml);
  return convert.xml2json(xmlText, { compact: false, spaces: 4 });
}
window.workspaceToJson = workspaceToJson;

function workspaceFromJson(jsonStr) {
  const options = { compact: false, spaces: 4 };
  return convert.json2xml(jsonStr, options);
}
window.workspaceFromJson = workspaceFromJson;

function workspaceToObject() {
  return JSON.parse(workspaceToJson());
}
window.workspaceToObject = workspaceToObject;

function getWorkspaceXml() {
  return window.BlocklyAPI.Xml.workspaceToDom(window.BlocklyAPI.mainWorkspace);
}
window.getWorkspaceXml = getWorkspaceXml;

function loadWorkspace() {
  const savedWs = localStorage.getItem("workspace");
  if (savedWs) {
    window.BlocklyAPI.mainWorkspace.clear();
    const xmlText = window.USE_JSON_FORMAT
      ? workspaceFromJson(savedWs)
      : savedWs;
    console.log("xmlText", xmlText);
    const xml = window.BlocklyAPI.Xml.textToDom(xmlText);
    window.BlocklyAPI.Xml.domToWorkspace(window.BlocklyAPI.mainWorkspace, xml);
  } else {
    alert("No saved workspace!");
  }
}
window.loadWorkspace = loadWorkspace;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.simpleWorkspace = React.createRef();
  }

  generateCode = () => {
    var code = BlocklyJS.workspaceToCode(
      this.simpleWorkspace.current.workspace
    );
    console.log(code);
  };

  saveToStorage = () => {
    saveWorkspace();
  };

  loadFromStorage = () => {
    loadWorkspace();
  };

  workspaceToJson = () => {
    console.log(workspaceToJson());
  };

  workspaceToXml = () => {
    console.log(getWorkspaceXml());
  };

  workspaceToObject = () => {
    console.log(workspaceToObject());
  };

  createNewWorkflow = () => {
    console.log("Call api to create new WF");
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.createNewWorkflow}>New workflow</button>
          <button onClick={this.createNewWorkflow}>Load workflow</button>
          <button onClick={this.generateCode}>Convert to code</button>
          <button onClick={this.saveToStorage}>Save to localStorage</button>
          <button onClick={this.loadFromStorage}>Load from localStorage</button>
          <button onClick={this.workspaceToJson}>Workspace to JSON</button>
          <button onClick={this.workspaceToXml}>Workspace to XML</button>
          <button onClick={this.workspaceToObject}>Workspace to Object</button>
          <BlocklyComponent
            ref={this.simpleWorkspace}
            readOnly={false}
            trashcan={true}
            media={"media/"}
            move={{
              scrollbars: true,
              drag: true,
              wheel: true,
            }}
            initialXml={`
<xml xmlns="http://www.w3.org/1999/xhtml">
<block type="entry_point_block" x="200" y="20"></block>
</xml>
      `}
          >
            <Category
              name="Variables"
              colour="330"
              custom="VARIABLE"
            ></Category>
            <Category name="Custom" colour="123">
              <Block type="entry_point_block" />
              <Block type="test_react_field" />
              <Block type="test_react_date_field" />
            </Category>
            <Category name="Logic" colour="210">
              <Block type="controls_ifelse" />
              <Block type="controls_if" />
              <Block type="logic_compare" />
              <Block type="logic_operation" />

              <Block type="logic_operation" />
              <Block type="logic_negate" />
              <Block type="logic_boolean" />
              <Block type="logic_null" disabled="true" />
              <Block type="logic_ternary" />
            </Category>
            <Category name="Loops" colour="120">
              <Block type="controls_whileUntil"></Block>
              <Block type="controls_repeat_ext">
                <Value name="TIMES">
                  <Shadow type="math_number">
                    <Field name="NUM">10</Field>
                  </Shadow>
                </Value>
              </Block>
              <Block type="controls_for">
                <Value name="FROM">
                  <Shadow type="math_number">
                    <Field name="NUM">1</Field>
                  </Shadow>
                </Value>
                <Value name="TO">
                  <Shadow type="math_number">
                    <Field name="NUM">10</Field>
                  </Shadow>
                </Value>
                <Value name="BY">
                  <Shadow type="math_number">
                    <Field name="NUM">1</Field>
                  </Shadow>
                </Value>
              </Block>
              <Block type="controls_forEach"></Block>
              <Block type="controls_flow_statements"></Block>
            </Category>
            <Category name="Math" colour="230">
              <Block type="math_number"></Block>
              <Block type="math_arithmetic">
                <Value name="A">
                  <Shadow type="math_number">
                    <Field name="NUM">1</Field>
                  </Shadow>
                </Value>
                <Value name="B">
                  <Shadow type="math_number">
                    <Field name="NUM">1</Field>
                  </Shadow>
                </Value>
              </Block>
              <Block type="math_single">
                <Value name="NUM">
                  <Shadow type="math_number">
                    <Field name="NUM">9</Field>
                  </Shadow>
                </Value>
              </Block>
              <Block type="math_trig">
                <Value name="NUM">
                  <Shadow type="math_number">
                    <Field name="NUM">45</Field>
                  </Shadow>
                </Value>
              </Block>
              <Block type="math_constant"></Block>
              <Block type="math_number_property">
                <Value name="NUMBER_TO_CHECK">
                  <Shadow type="math_number">
                    <Field name="NUM">0</Field>
                  </Shadow>
                </Value>
              </Block>
              <Block type="math_round">
                <Value name="NUM">
                  <Shadow type="math_number">
                    <Field name="NUM">3.1</Field>
                  </Shadow>
                </Value>
              </Block>
              <Block type="math_on_list"></Block>
              <Block type="math_modulo">
                <Value name="DIVIDEND">
                  <Shadow type="math_number">
                    <Field name="NUM">64</Field>
                  </Shadow>
                </Value>
                <Value name="DIVISOR">
                  <Shadow type="math_number">
                    <Field name="NUM">10</Field>
                  </Shadow>
                </Value>
              </Block>
              <Block type="math_constrain">
                <Value name="VALUE">
                  <Shadow type="math_number">
                    <Field name="NUM">50</Field>
                  </Shadow>
                </Value>
                <Value name="LOW">
                  <Shadow type="math_number">
                    <Field name="NUM">1</Field>
                  </Shadow>
                </Value>
                <Value name="HIGH">
                  <Shadow type="math_number">
                    <Field name="NUM">100</Field>
                  </Shadow>
                </Value>
              </Block>
              <Block type="math_random_int">
                <Value name="FROM">
                  <Shadow type="math_number">
                    <Field name="NUM">1</Field>
                  </Shadow>
                </Value>
                <Value name="TO">
                  <Shadow type="math_number">
                    <Field name="NUM">100</Field>
                  </Shadow>
                </Value>
              </Block>
              <Block type="math_random_float"></Block>
            </Category>
            <Category name="Text" colour="160">
              <Block type="text"></Block>
              <Block type="text_join"></Block>
              <Block type="text_append">
                <Value name="TEXT">
                  <Shadow type="text"></Shadow>
                </Value>
              </Block>
              <Block type="text_length">
                <Value name="VALUE">
                  <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                  </Shadow>
                </Value>
              </Block>
              <Block type="text_isEmpty">
                <Value name="VALUE">
                  <Shadow type="text">
                    <Field name="TEXT"></Field>
                  </Shadow>
                </Value>
              </Block>
              <Block type="text_indexOf">
                <Value name="VALUE">
                  <Block type="variables_get">
                    <Field name="VAR">textVariable</Field>
                  </Block>
                </Value>
                <Value name="FIND">
                  <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                  </Shadow>
                </Value>
              </Block>
              <Block type="text_charAt">
                <Value name="VALUE">
                  <Block type="variables_get">
                    <Field name="VAR">textVariable</Field>
                  </Block>
                </Value>
              </Block>
              <Block type="text_getSubstring">
                <Value name="STRING">
                  <Block type="variables_get">
                    <Field name="VAR">textVariable</Field>
                  </Block>
                </Value>
              </Block>
              <Block type="text_changeCase">
                <Value name="TEXT">
                  <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                  </Shadow>
                </Value>
              </Block>
              <Block type="text_trim">
                <Value name="TEXT">
                  <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                  </Shadow>
                </Value>
              </Block>
              <Block type="text_print">
                <Value name="TEXT">
                  <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                  </Shadow>
                </Value>
              </Block>
              <Block type="text_prompt_ext">
                <Value name="TEXT">
                  <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                  </Shadow>
                </Value>
              </Block>
            </Category>
            <Category name="Lists" colour="260">
              <Block type="lists_create_with"></Block>
              <Block type="lists_repeat">
                <Value name="NUM">
                  <Shadow type="math_number">
                    <Field name="NUM">5</Field>
                  </Shadow>
                </Value>
              </Block>
              <Block type="lists_length"></Block>
              <Block type="lists_isEmpty"></Block>
              <Block type="lists_indexOf">
                <Value name="VALUE">
                  <Block type="variables_get">
                    <Field name="VAR">listVariable</Field>
                  </Block>
                </Value>
              </Block>
              <Block type="lists_getIndex">
                <Value name="VALUE">
                  <Block type="variables_get">
                    <Field name="VAR">listVariable</Field>
                  </Block>
                </Value>
              </Block>
              <Block type="lists_setIndex">
                <Value name="LIST">
                  <Block type="variables_get">
                    <Field name="VAR">listVariable</Field>
                  </Block>
                </Value>
              </Block>
              <Block type="lists_getSublist">
                <Value name="LIST">
                  <Block type="variables_get">
                    <Field name="VAR">listVariable</Field>
                  </Block>
                </Value>
              </Block>
              <Block type="lists_split">
                <Value name="DELIM">
                  <Shadow type="text">
                    <Field name="TEXT">,</Field>
                  </Shadow>
                </Value>
              </Block>
              <Block type="lists_sort"></Block>
            </Category>
            <Category name="Colours" colour="20">
              <Block type="colour_picker"></Block>
              <Block type="colour_random"></Block>
              <Block type="colour_rgb">
                <Value name="RED">
                  <Shadow type="math_number">
                    <Field name="NUM">100</Field>
                  </Shadow>
                </Value>
                <Value name="GREEN">
                  <Shadow type="math_number">
                    <Field name="NUM">50</Field>
                  </Shadow>
                </Value>
                <Value name="BLUE">
                  <Shadow type="math_number">
                    <Field name="NUM">0</Field>
                  </Shadow>
                </Value>
              </Block>
              <Block type="colour_blend">
                <Value name="COLOUR1">
                  <Shadow type="colour_picker">
                    <Field name="COLOUR">#ff0000</Field>
                  </Shadow>
                </Value>
                <Value name="COLOUR2">
                  <Shadow type="colour_picker">
                    <Field name="COLOUR">#3333ff</Field>
                  </Shadow>
                </Value>
                <Value name="RATIO">
                  <Shadow type="math_number">
                    <Field name="NUM">0.5</Field>
                  </Shadow>
                </Value>
              </Block>
            </Category>
          </BlocklyComponent>
        </header>
      </div>
    );
  }
}

export default App;

import React from "react";
import "./App.css";

import BlocklyComponent, {
  Block,
  Value,
  Field,
  Shadow,
  Category,
} from "./Blockly";
import * as BlocklyAPI from "blockly/core";

import { fetchAction, updateAction } from "./wfb_api";

import "./blocks/customblocks";

export default class ActionEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: undefined,
      workspaceXml: this.getInitialWs(),
    };
    this.simpleWorkspace = React.createRef();
  }

  async componentDidMount() {
    const action = await fetchAction(this.props.currentWorkflow.action_ids[0]);
    this.setState({
      action: action,
    });
    console.log("action", action);
    BlocklyAPI.mainWorkspace.clear();
    const xmlText = action.blocks || this.getInitialWs();
    console.log("xmlText", xmlText);
    const xml = BlocklyAPI.Xml.textToDom(xmlText);
    BlocklyAPI.Xml.domToWorkspace(BlocklyAPI.mainWorkspace, xml);
  }

  getInitialWs = () => {
    return `
    <xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="entry_point_block" x="200" y="20"></block>
    </xml>
    `;
  };

  save = async () => {
    const xml = BlocklyAPI.Xml.workspaceToDom(BlocklyAPI.mainWorkspace);
    const xmlText = BlocklyAPI.Xml.domToText(xml);
    const action = this.state.action;
    action.blocks = xmlText;
    this.setState({
      action: action,
    });
    await updateAction(action);
  };

  onBackClick = () => {
    this.props.setWorkflowListView();
  };

  render() {
    return (
      <div>
        <header className="App-header">
          <button onClick={this.save}>Save</button>
          <button onClick={this.onBackClick}>Back</button>
        </header>
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
          initialXml={this.state.workspaceXml}
        >
          <Category name="Variables" colour="330" custom="VARIABLE"></Category>
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
      </div>
    );
  }
}

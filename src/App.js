import React from "react";
import "./App.css";

import ActionEditor from "./ActionEditor";
import WorkflowList from "./WorkflowList";
import SetToken from "./SetToken";

import { getToken, setToken } from "./wfb_api";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: getToken() !== null ? "workflow-list" : "set-token",
      currentWorkflow: undefined,
    };
    this.simpleWorkspace = React.createRef();
  }

  setWorkflowListView = () => {
    this.setState({
      currentView: "workflow-list",
    });
  };

  setActionEditorView = (workflow) => {
    this.setState({
      currentView: "action-editor",
      currentWorkflow: workflow,
    });
  };

  onSetToken = (token) => {
    setToken(token);
    this.setState({
      currentView: "workflow-list",
    });
  };

  getView() {
    switch (this.state.currentView) {
      case "action-editor":
        return (
          <ActionEditor
            setWorkflowListView={this.setWorkflowListView}
            currentWorkflow={this.state.currentWorkflow}
          />
        );
      case "set-token":
        return <SetToken onSetToken={this.onSetToken} />;
      case "workflow-list":
        return <WorkflowList onWorkflowSelect={this.setActionEditorView} />;
      default:
        return <WorkflowList onWorkflowSelect={this.setActionEditorView} />;
    }
  }

  render() {
    return <div className="App">{this.getView()}</div>;
  }
}

export default App;

import React from "react";

import { fetchWorkflows, createWorkflow, deleteWorkflow } from "./wfb_api";

export default class WorkflowList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workflows: undefined,
    };
    this.newWorkflowName = "";
  }

  async componentDidMount() {
    try {
      const workflows = await fetchWorkflows(1);
      this.setState({ workflows: workflows.results });
    } catch (e) {
      console.log("Failed to fetch existing workflows");
    }
  }

  createWorkflow = async () => {
    console.log("creating workflow", this.newWorkflowName);
    try {
      const wf = await createWorkflow(this.newWorkflowName);
      console.log("Created WF", wf);
      this.newWorkflowName = "";
      this.setState((state, props) => {
        return {
          workflows: [...state.workflows, wf],
        };
      });
    } catch (e) {
      console.log("Failed to create workflow");
    }
  };

  deleteWorkflow = async (workflow) => {
    try {
      await deleteWorkflow(workflow.id);
      this.setState((state, props) => {
        return {
          workflows: state.workflows.filter((item) => item.id !== workflow.id),
        };
      });
      console.log("Deleted WF", workflow);
    } catch (e) {
      console.log("Failed to delete workflow", e);
    }
  };

  openWorkflow = (workflow) => {
    this.props.onWorkflowSelect(workflow);
  };

  render() {
    return (
      <div>
        <header className="App-header"></header>
        <ul>
          <li className="App-workflow-list-item create-wf">
            <form>
              <h3>Create new workflow</h3>
              <input
                type="text"
                placeholder="Give name for the workflow.."
                onChange={(event) =>
                  (this.newWorkflowName = event.target.value)
                }
              ></input>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  this.createWorkflow();
                }}
              >
                Create
              </button>
            </form>
          </li>
        </ul>
        <ul>
          {this.state.workflows !== undefined ? (
            this.state.workflows.map((workflow) => {
              return (
                <li key={workflow.id} className="App-workflow-list-item">
                  <span onClick={() => this.openWorkflow(workflow)}>
                    {workflow.name}
                  </span>
                  <button
                    className="trash"
                    onClick={() => this.deleteWorkflow(workflow)}
                  >
                    🗑️
                  </button>
                </li>
              );
            })
          ) : (
            <li className="App-workflow-list-item">Loading..</li>
          )}
        </ul>
      </div>
    );
  }
}

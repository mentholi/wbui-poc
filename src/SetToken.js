import React from "react";

export default class SetToken extends React.Component {
  constructor(props) {
    super(props);
    this.token = "";
  }

  onSaveTokenClick = () => {
    this.props.onSetToken(this.token);
    this.token = "";
  };

  render() {
    return (
      <div>
        <header className="App-header"></header>
        <ul>
          <li className="App-workflow-list-item create-wf">
            <form>
              <h3>Hello, give your Api Token to continue</h3>
              <input
                type="text"
                placeholder="Paste your token here"
                onChange={(event) => (this.token = event.target.value)}
              ></input>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  this.onSaveTokenClick();
                }}
              >
                Create
              </button>
            </form>
          </li>
        </ul>
      </div>
    );
  }
}

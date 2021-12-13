const API_BASE_URL = "https://api.giosg.com/workflow_builder";
const LOCAL_STORAGE_AUTH_KEY = "giosg_oauth_token";

export const getToken = () => {
  const token = window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
  if (!token) {
    console.warn(
      `Could not find API token from localStoreg with key "${LOCAL_STORAGE_AUTH_KEY}"`
    );
    return null;
  }
  return token;
};

export const setToken = (token) => {
  window.localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, token);
  return token;
};

export const fetchWorkflows = async (pageNumber) => {
  if (!pageNumber) {
    pageNumber = 1;
  }
  const response = await fetch(
    `${API_BASE_URL}/configuration/workflows?page=${pageNumber}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`,
      },
    }
  );
  return await response.json();
};

export const fetchAction = async (action_id) => {
  const response = await fetch(
    `${API_BASE_URL}/configuration/actions/${action_id}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`,
      },
    }
  );
  return await response.json();
};

export const createWorkflow = async (name) => {
  const actionResponse = await fetch(`${API_BASE_URL}/configuration/actions`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      name: "Action",
      description: "Action",
      status: "draft",
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${getToken()}`,
    },
  });
  if (!actionResponse.ok) {
    throw new Error("Failed to create action for workflow");
  }
  const action = await actionResponse.json();
  const workflowResponse = await fetch(
    `${API_BASE_URL}/configuration/workflows`,
    {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        name: name,
        description: name,
        status: "draft",
        action_ids: [action.id],
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`,
      },
    }
  );
  if (!workflowResponse.ok) {
    throw new Error("Failed to create WF");
  }

  return await workflowResponse.json();
};

export const updateAction = async (action) => {
  const actionResponse = await fetch(
    `${API_BASE_URL}/configuration/actions/${action.id}`,
    {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(action),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`,
      },
    }
  );
  if (!actionResponse.ok) {
    throw new Error("Failed to update action for workflow");
  }

  return await actionResponse.json();
};

export const deleteWorkflow = async (workflow_id) => {
  const response = await fetch(
    `${API_BASE_URL}/configuration/workflows/${workflow_id}`,
    {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`,
      },
    }
  );
  return response;
};

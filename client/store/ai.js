import axios from "axios";
const TOKEN = "token";
// Action Types
const SET_AI_RESULTS = "SET_AI_RESULTS";

// Additional action type
const ADD_TODO_ITEM = "ADD_TODO_ITEM";

// Define action types
const CREATE_IDEA = "CREATE_IDEA";

const createIdea = (idea) => ({
  type: CREATE_IDEA,
  payload: idea,
});

// Action creator for adding a to-do item

// Example of dispatching addTodoItem with an AI-generated idea

// In your Redux action file

// Assuming you're using Redux Thunk middleware
export const addTodoItemAsync = (todoItem) => async (dispatch) => {
  try {
    // Assuming you have a backend endpoint to handle adding to-do items
    const response = await fetch("/api/todo/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include your auth token if necessary
        Authorization: `Bearer ${window.localStorage.getItem(TOKEN)}`,
      },
      body: JSON.stringify({ todoItem }),
    });

    if (!response.ok) {
      throw new Error("Failed to add to-do item.");
    }

    const data = await response.json();
    // Dispatch the ADD_TODO_ITEM action with the data received from the server
    // This assumes the server responds with the added to-do item
    dispatch({ type: ADD_TODO_ITEM, todoItem: data.todoItem });
  } catch (error) {
    console.error("An error occurred while adding the to-do item:", error);
  }
};

export const submitAIResultsAsIdeas = (aiResults, companyId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      aiResults?.map(async (result) => {
        const response = await axios.post(
          `/api/ideas`,
          { ...result, companyId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(createIdea(response.data));
      });
    } catch (error) {
      console.error("Failed to submit AI-generated idea:", error);
    }
  };
};

// Thunk Function
// Assuming fetchAIResults is a thunk action
export const fetchAIResults = (companyData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "/api/googleai/improve-company",
      { companyData },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch AI results.");
    }

    // Assuming the API returns a structure where the actual ideas are directly accessible
    const aiIdeas = response.data.results.map((idea) => ({
      content: idea,
      status: "backlog", // Default status for new ideas
    }));

    // Dispatch an action to set AI results in the store if needed
    // For direct component state update, you can simply return the results here
    return aiIdeas;
  } catch (error) {
    console.error("An error occurred while fetching AI results:", error);
    return []; // Return an empty array in case of error
  }
};

// Extend initialState to include to-do list items
const initialState = {
  aiResults: [],
  todoItems: [], // Assuming this holds your to-do list items
};

// Extend aiReducer to handle adding to-do items
const aiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AI_RESULTS:
      return {
        ...state,
        aiResults: action.results,
      };
    case ADD_TODO_ITEM:
      return {
        ...state,
        todoItems: [...state.todoItems, action.todoItem],
      };
    default:
      return state;
  }
};

export default aiReducer;

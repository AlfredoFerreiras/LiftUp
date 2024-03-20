// Action Types

import axios from "axios";

const TOKEN = "token";

const CREATE_COMPANY = "CREATE_COMPANY";
const UPDATE_COMPANY = "UPDATE_COMPANY";
const DELETE_COMPANY = "DELETE_COMPANY";
const GET_COMPANIES = "GET_COMPANIES";
const GET_SINGLE_COMPANY = "GET_SINGLE_COMPANY";
const GET_SINGLE_COMPANY_IDEAS = "GET_SINGLE_COMPANY_IDEAS";
const ADD_IDEAS_TO_COMPANY = "ADD_IDEAS_TO_COMPANY"; // For adding AI-generated ideas
const UPDATE_IDEAS_TO_COMPANY = "UPDATE_IDEAS_TO_COMPANY";
// Action Creators
export const createCompany = (company) => ({
  type: CREATE_COMPANY,
  company,
});

export const updateCompany = (company) => ({
  type: UPDATE_COMPANY,
  payload: company,
});

export const deleteCompany = (companyId) => ({
  type: DELETE_COMPANY,
  companyId,
});

export const getCompanies = (companies) => ({
  type: GET_COMPANIES,
  companies,
});

export const getSingleCompany = (company) => ({
  type: GET_SINGLE_COMPANY,
  company,
});

export const getSingleCompanyIdeas = (company) => ({
  type: GET_SINGLE_COMPANY_IDEAS,
  company,
});

export const addIdeasToCompany = (companyId, ideas) => ({
  type: ADD_IDEAS_TO_COMPANY,
  companyId,
  ideas,
});

export const updateIdeasToCompany = (companyId, ideas) => ({
  type: UPDATE_IDEAS_TO_COMPANY,
  companyId,
  ideas,
});

// Thunks
export const createCompanyThunk = (companyData) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const response = await axios.post("/api/companies", companyData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(createCompany(response.data));
    } catch (error) {
      console.log("Failed to create a company", error);
    }
  };
};

export const updateCompanyIdeas = (companyId, ideas) => {
  return async (dispatch) => {
    try {
      // Ensure the Authorization header is correctly configured
      const token = window.localStorage.getItem("token");

      const res = await axios.put(
        `/api/companies/${companyId}/ideas`,
        { ideas },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedIdeas = res.data;

      dispatch(updateIdeasToCompany(companyId, updatedIdeas));
    } catch (error) {
      console.error("An error occurred while updating company ideas:", error);
    }
  };
};

export const addCompanyToIdeasThunk = (companyId, ideas) => {
  return async (dispatch) => {
    try {
      // Ensure the Authorization header is correctly configured
      const token = window.localStorage.getItem(TOKEN);

      const res = await axios.post(
        `/api/companies/${companyId}/ideas`,
        { ideas },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedIdeas = res.data;

      dispatch(updateIdeasToCompany(companyId, updatedIdeas));
    } catch (error) {
      console.error("An error occurred while updating company ideas:", error);
    }
  };
};

export const fetchUserCompanies = () => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/companies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const companies = response.data;
    dispatch(getCompanies(companies));
  } catch (error) {
    console.error("Failed to fetch companies:", error.response.data);
  }
};

export const fetchSingleCompany = (id) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await axios.get(`/api/companies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const company = response.data;
    dispatch(getSingleCompany(company));
  } catch (error) {
    console.error("Failed to fetch company:", error.response.data);
  }
};

export const fetchSingleCompanyWithIdeas = (id) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");

    const response = await axios.get(`/api/companies/${id}/ideas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const company = response.data;

    dispatch(getSingleCompanyIdeas(company));
  } catch (error) {
    console.error("Failed to fetch company:", error.response.data);
  }
};

// Company Reducer
const initialState = [];

function companyReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_COMPANY:
      return [...state, action.company];
    case UPDATE_COMPANY:
      return state.map((company) =>
        company.id === action.payload.id ? action.company : company
      );
    case DELETE_COMPANY:
      return state.filter((company) => company.id !== action.companyId);
    case GET_COMPANIES:
      return action.companies;
    case GET_SINGLE_COMPANY:
      return state.map((company) =>
        company.id === action.company.id ? action.company : company
      );
    case GET_SINGLE_COMPANY_IDEAS:
      return state.map((company) =>
        company.id === action.company.id ? action.company : company
      );
    case ADD_IDEAS_TO_COMPANY:
      return state.map((company) =>
        company.id === action.companyId
          ? { ...company, ideas: [...company.ideas, ...action.ideas] }
          : company
      );
    case UPDATE_IDEAS_TO_COMPANY:
      return state.map((company) =>
        company.id === action.companyId
          ? { ...company, ideas: [...company.ideas, ...action.ideas] }
          : company
      );

    default:
      return state;
  }
}

export default companyReducer;

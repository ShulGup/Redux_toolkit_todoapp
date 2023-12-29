// reducers.js
const initialState = {
  data: null,
  loading: false,
  error: null,
  user: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA_START":
      return { ...state, loading: true, error: null };
    case "FETCH_DATA_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_DATA_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_USER":
      return { ...state, user: action.payload };
    case "DELETE_USER":
      const updatedUsers = state.user.filter(
        (user) => user.id !== action.payload
      );
      return { ...state, user: updatedUsers };
    default:
      return state;
  }
};

export default dataReducer;

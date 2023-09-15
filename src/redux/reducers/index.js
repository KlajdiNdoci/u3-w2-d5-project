const initialState = {
  query: {
    content: "",
  },

  weatherData: {
    content: null,
  },

  isLoading: {
    content: false,
  },

  error: {
    content: null,
  },
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case "QUERY":
      return {
        ...state,
        query: {
          ...state.query,
          content: action.payload,
        },
      };
    case "WEATHER_DATA":
      return {
        ...state,
        weatherData: {
          ...state.weatherData,
          content: action.payload,
        },
        isLoading: {
          content: false,
        },
        error: {
          content: null,
        },
      };
    case "LOADING_WEATHER":
      return {
        ...state,
        isLoading: {
          content: true,
        },
      };
    case "WEATHER_ERROR":
      return {
        ...state,
        error: {
          content: action.payload,
        },
        isLoading: {
          content: false,
        },
      };
    default:
      return state;
  }
};

export default myReducer;

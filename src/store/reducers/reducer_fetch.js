

const initialState = {

  data: {
    company: [],
    companyType: []
  },
  options: [],
  sortOptions:[],
  searched: null,
  sortResult:null
};

const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATA":
      // console.log('Reducer: ',action.payload);
      return {
        ...state,
        data: {
          company: action.payload.company,
          companyType: action.payload.companyType
        }
      };
    case "SET_OPTIONS":
      // console.log('Reducer: ',action.payload);
      return {
        ...state,
        options: action.payload
      };
    case "SEARCH_RESULTS":
      // console.log("Reducer search: ", action.payload);
      return {
        ...state,
        searched: action.payload
      };
    case "CLEAR_SEARCH":
      return {
        ...state,
        searched: null
      };
    case "SORT_OPTIONS":
    // console.log("Reducer sort: ", action.payload);
      return{
        ...state,
        sortOptions:action.payload
      };
      case "SORT_RESULT":
    console.log("Reducer sort: ", action.payload);
      return{
        ...state,
        sortResult:action.payload
      };
    default:
      return state;
  }
};

export default fetchReducer;

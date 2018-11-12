import axios from "axios";

export const setData = data => {
  // console.log('setData:',data)
  return {
    type: "SET_DATA",
    payload: (data = {
      company: data,
      companyType: data.companyType
    })
  };
};

export const setOptions = data => {
  // console.log('Set options',data);
  return {
    type: "SET_OPTIONS",
    payload: data
  };
};

export const sortOptions = data => {
  return {
    type: "SORT_OPTIONS",
    payload: data
  };
};

export const searchResult = data => {
  // console.log("Search result", data);
  return {
    type: "SEARCH_RESULTS",
    payload: data
  };
};
export const sortResult = data => {
  // console.log("Search result", data);
  return {
    type: "SORT_RESULT",
    payload: data
  };
};

export const fetchInitialData = () => {
  return dispatch => {
    axios
      .get("http://localhost:3000/db")
      .then(response => {
        // console.log("Axios response.data: ", response.data.company);
        // this.setState({ data: response.data }, this.createOptionsForSelect);
        dispatch(setData(response.data.company));
        return response;
      })
      .then(response => {
        // console.log("Axios response.data: ", response.data.companyType);
        const options = response.data.companyType;
        const addedEmptyOption = { id: 0, title: "---" };
        const res = [addedEmptyOption, ...options];
        dispatch(setOptions(res));
        return response;
      })
      .then(response => {
        const options = Object.keys(response.data.company[0]).map((x, i) => {
          return {
            id: i + 1,
            title: x
          };
        });
        // console.log("OPTIONS", options);
        const addedEmptyOption = { id: 0, title: "---" };
        const res = [addedEmptyOption, ...options];
        dispatch(sortOptions(res));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const fetchSearchData = searched => {
  return dispatch => {
    let baseUrl = `http://localhost:3000/company?q=`;
    baseUrl += searched;
    axios
      .get(baseUrl)
      .then(response => {
        dispatch(searchResult(response.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const sortBy = sortedBy => {
  console.log("Sorted by: ", sortedBy.target.value);
  return dispatch => {
    let baseUrl = `http://localhost:3000/company?_sort=`;
    baseUrl += sortedBy.target.value;
    axios
      .get(baseUrl)
      .then(response => {
        dispatch(sortResult(response.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const clearSearch = () => {
  return {
    type: "CLEAR_SEARCH"
  };
};

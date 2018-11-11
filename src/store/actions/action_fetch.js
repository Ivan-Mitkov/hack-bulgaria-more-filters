import axios from "axios";

export const setData = data => {
  console.log('setData:',data)
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

export const searchResult = data => {
  console.log("Search result", data);
  return {
    type: "SEARCH_RESULTS",
    payload: data
  };
};

export const fetchInitialData = () => {
  return dispatch => {
    axios
      .get('http://localhost:3000/db')
      .then(response => {
        console.log("Axios response.data: ", response.data.company);
        // this.setState({ data: response.data }, this.createOptionsForSelect);
        dispatch(setData(response.data.company));
        return response;
      })
      .then(response => {
        console.log("Axios response.data: ", response.data.companyType);
        const options = response.data.companyType;
        const addedEmptyOption = { id: 0, title: "" };
        const res = [addedEmptyOption, ...options];
        dispatch(setOptions(res));
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

export const clearSearch = () => {
  return {
    type: "CLEAR_SEARCH"
  };
};

import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import Filters from "./components/filters/Filters/Filters";
import Grid from "./components/grid/grid/Grid";
import { isChecked, select, input } from "./store/actions/action_filters.js";
import {
  fetchInitialData,
  fetchSearchData,
  clearSearch
} from "./store/actions/action_fetch.js";

class App extends Component {
  componentDidMount() {
    this.props.fetchInitialData();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("CDU", this.props);

    if (
      (this.props.search && !prevProps.search) ||
      prevProps.search !== this.props.search
    ) {
      this.props.fetchSearchData(this.props.search);
    }
    if (this.props.search === "" && prevProps.search !== this.props.search) {
      this.props.clearSearch();
    }
  }

  filterData = () => {
    let filtered = [];

    if (!this.props.initFilter && this.props.searched && this.props.search) {
      filtered = this.props.searched;
    } else if (this.props.searched) {
      filtered = this.props.searched
        .filter(x => x.type === this.props.companyType)
        .filter(y => y.active === this.props.isActiv);
    } else if (this.props.data.company) {
      filtered = this.props.data.company
        .filter(x => x.type === this.props.companyType)
        .filter(y => y.active === this.props.isActiv);
    }

    return filtered;
  };

  render() {
    // let companyType = this.props.options;
    let filteredArr = this.filterData();
    let grid = null;
    if (!this.props.search && !this.props.initFilter) {
      grid = <Grid data={this.props.data.company} />;
    } else if (filteredArr.length > 0) {
      grid = <Grid data={filteredArr} />;
    } else {
      grid = <Grid data={filteredArr} />;
    }
    return (
      <div className="App">
        <div>
          <Filters />
        </div>
        <div>{grid}</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log("State to props:", state.fetch);
  return {
    isActiv: state.filter.isActiv,
    initFilter: state.filter.initFilter,
    companyType: state.filter.companyType,
    search: state.filter.search,
    data: {
      company: state.fetch.data.company,
      companyType: state.fetch.data.companyType
    },
    options: state.fetch.options,
    searched: state.fetch.searched
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //pass and execute action creators
    handleIsChecked: () => dispatch(isChecked()),
    handleSelectChange: event => dispatch(select(event)),
    handleInputChange: event => dispatch(input(event)),
    fetchInitialData: () => dispatch(fetchInitialData()),
    fetchSearchData: s => dispatch(fetchSearchData(s)),
    clearSearch: () => dispatch(clearSearch())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

import React from "react";
import classes from "./Filters.module.css";
import { connect } from "react-redux";

import Searchbar from "../Searchbar/Searchbar";
import Select from "../Select/Select";
import RadioButton from "../RadioButton/RadioButton";

import { isChecked, select, input } from "../../../store/actions/action_filters";
import { fetchInitialData,fetchSearchData,clearSearch } from "../../../store/actions/action_fetch.js";

class Filters extends React.Component {
  render(){
    return (
      <div className={classes.pos}>
        <Searchbar
          handleInputChange={this.props.handleInputChange}
          search={this.props.search}
          searchedWord={this.props.searchedWord}
        />
        <Select
          options={this.props.options}
          selectValue={this.props.selectValue}
          handleSelectChange={this.props.handleSelectChange}
        />
        <RadioButton
          handleIsChecked={this.props.handleIsChecked}
          checked={this.props.checked}
        />
      </div>
    );
  }
  
};
const mapStateToProps = state => {
  console.log("State to props:", state.fetch);
  return {
    isActiv: state.filter.isActiv,
    initFilter: state.filter.initFilter,
    companyType: state.filter.companyType,
    search: state.filter.search,
    data: {
      company: state.fetch.data.company,
      companyType:state.fetch.data.companyType
    },
    options:state.fetch.options,
    searched:state.fetch.searched,
    checked:state.filter.isActiv
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //pass and execute action creators
    handleIsChecked: () => dispatch(isChecked()),
    handleSelectChange: event => dispatch(select(event)),
    handleInputChange: event => dispatch(input(event)),
    fetchInitialData: () => dispatch(fetchInitialData()),
    fetchSearchData:(s)=>dispatch(fetchSearchData(s)),
    clearSearch:()=>dispatch(clearSearch())
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);



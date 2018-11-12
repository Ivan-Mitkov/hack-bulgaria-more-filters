import React from "react";
import classes from "./Filters.module.css";
import { connect } from "react-redux";

import Searchbar from "../Searchbar/Searchbar";
import Select from "../Select/Select";
import RadioButton from "../RadioButton/RadioButton";

import { isChecked, select, input } from "../../../store/actions/action_filters";
import { sortBy } from "../../../store/actions/action_fetch.js";

class Filters extends React.Component {
  
  
  render(){
    
    return (
      <div className={classes.pos}>
      <div className={classes.selectWithText}>
       <div className={classes.label}> Sort by:</div> 
      <Select
          options={this.props.sortOptions}
          // selectValue={this.props.selectValue}
          handleSelectChange={this.props.handleSort}
        />
      </div>
       
        <Searchbar
          handleInputChange={this.props.handleInputChange}
          search={this.props.search}
          searchedWord={this.props.searchedWord}
        />
        <Select
          options={this.props.options}
          // selectValue={this.props.selectValue}
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
  // console.log("State to props:", state.fetch);
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
    checked:state.filter.isActiv,
    sortOptions:state.fetch.sortOptions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //pass and execute action creators
    handleIsChecked: () => dispatch(isChecked()),
    handleSelectChange: event => dispatch(select(event)),
    handleInputChange: event => dispatch(input(event)),
    // fetchInitialData: () => dispatch(fetchInitialData()),
    // fetchSearchData:(s)=>dispatch(fetchSearchData(s)),
    // clearSearch:()=>dispatch(clearSearch()),
    
    handleSort:event=>dispatch(sortBy(event))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);



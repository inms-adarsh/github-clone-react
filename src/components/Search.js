import React, { Component } from "react";
import ProfileList from "./ProfileList.js";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toaster, Pane, IconButton, SearchInput, majorScale, Text } from 'evergreen-ui'

import { fetchProfiles, setSearchText, setNextPage, setPrevPage } from '../store/profiles/profileActions';

class Search extends Component {

  pageSize = 10
  state = {
    profiles: this.props.profiles,
    currentPage: 1,
    pageSize: 10,
    searchText: ''
  };


  searchProfiles = (e) => {
    this.setState({
      searchText: e.target.value,
      currentPage: 1
    }, () => this.fetchData());

  }

  fetchData = () => {
    if (this.state.searchText) {
      this.props.setSearchText(this.state)
      this.props.fetchProfiles(this.state.searchText, this.state.currentPage, this.pageSize)
    } else {
      this.props.setSearchText(this.state)
    }
  }


  nextPage = (e) => {
    this.setState({
      currentPage: this.state.currentPage + 1
    }, () => this.fetchData());
  }

  prevPage = (e) => {
    this.setState({
      currentPage: this.state.currentPage > 0 ? this.state.currentPage - 1 : 0
    }, () => this.fetchData());
  }

  renderInputForm = () => {
    const { searchText, setSearchText } = this.props;
    return (
      <Pane flex={1} alignItems="center" display="flex" borderBottom="muted">
        <SearchInput placeholder="Find a member..." value={searchText} onChange={setSearchText} marginBottom={majorScale(1)} />
      </Pane>
    );
  };

  // when component re-renders
  componentDidUpdate(prevProps) {
    if (this.props.error) {
      toaster.closeAll()
      toaster.danger(this.props.error.message)
      return;
    } else {
      toaster.closeAll()

      // if the current page changes, or the search term changes.
      if((prevProps.currentPage !== this.props.currentPage || 
        prevProps.searchText !== this.props.searchText) && this.props.searchText) {
        this.props.fetchProfiles(this.props.searchText, this.props.currentPage);
      }
      
    }
  }

  render() {
    const { profiles, totalCount, currentPage, setPrevPage, setNextPage, searchText } = this.props;

    const totalPages = Math.ceil(totalCount / 10);

    return (
      <React.Fragment>

        {this.renderInputForm()}

        {searchText ? (
          <ProfileList profileListData={profiles} />
        ) : (
            <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
              <Text size={400}>Please enter in search box to list user.</Text>
            </Pane>
          )}}

        {profiles.length > 0 && searchText && (

          <Pane display="flex" flexDirection="row" alignItems="center" padding={majorScale(1)}>
            <Text flex={1} size={400}>
              Total {totalPages} pages
              </Text>
            <Pane display="flex" flexDirection="row">
              <IconButton icon="chevron-left" onClick={setPrevPage} disabled={currentPage === 1} />
              <IconButton icon="chevron-right" onClick={setNextPage} disabled={currentPage === totalPages} />
            </Pane>
          </Pane>
        )}
      </React.Fragment>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchProfiles: fetchProfiles,
    setSearchText: setSearchText,
    setNextPage: setNextPage,
    setPrevPage: setPrevPage
  }, dispatch);
}


const mapStateToProps = state => ({
  profiles: state.profiles.profiles,
  searchText: state.profiles.searchText,
  totalCount: state.profiles.total_count,
  currentPage: state.profiles.currentPage,
  error: state.profiles.error
});


export default connect(mapStateToProps, mapDispatchToProps)(Search);
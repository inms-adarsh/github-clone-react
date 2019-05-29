import React, { Component } from "react";


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchRepos } from '../store/repos/reposActions';

import { Button, Pane, Select, Icon, majorScale, SearchInput, Text, minorScale } from 'evergreen-ui'
class Repos extends Component {
    
    username = this.props.match.params.username;
    
    componentDidMount() {
        this.props.fetchRepos(this.username);
    }

    sortRepos = (e) => {
        this.props.fetchRepos(this.username, e.target.value);
    };

    renderRepoItem(repo) {
        return (
            <Pane key={repo.id} display="flex" padding={majorScale(1)} borderBottom="muted">
                <Pane flex={1} display="flex" flexDirection="column" paddingLeft={12} borderRadius={3}>
                    <Text color="#1070CA" size={600}>{repo.name}</Text>
                    <Text size="300" marginTop={minorScale(2)}>{repo.description}</Text>
                    <Pane display="flex" marginTop={minorScale(5)} flexDirection="row">
                        {repo.language && (
                            <Text size="300" marginRight={minorScale(4)}>
                                {repo.language}
                            </Text>
                        )}
                        <Text size="300" marginRight={minorScale(4)}>
                            <Icon icon="star" marginRight={minorScale(1)} size={minorScale(3)}></Icon>
                            {repo.stargazers_count}
                        </Text>
                        <Text size="300" marginRight={minorScale(4)}>
                            <Icon icon="git-branch" marginRight={minorScale(1)} size={minorScale(3)}></Icon>
                            {repo.forks_count}
                        </Text>
                    </Pane>
                </Pane>

                {/* Below you can see the marginRight property on a Button. */}
                <Button iconBefore="star">Star</Button>
            </Pane>
        )
    }

    renderRepoSearch() {
        return (
            <Pane flex={1} display="flex" borderBottom="muted" borderTop="muted">
                <Pane flex={1} padding={majorScale(1)} >
                    <SearchInput width="100%" placeholder="Find a repository..." />
                </Pane>
                <Pane padding={majorScale(1)} >
                    <Select onChange={this.sortRepos}>
                        <option value="full_name" checked>Name</option>
                        <option value="created">Created</option>
                        <option value="updated">Updated</option>
                        <option value="pushed">Pushed</option>
                    </Select>                   
                </Pane>
            </Pane>
        )
    }

    renderRepositorySummary() {
     
        const { repos } = this.props;
        return (
            <React.Fragment>
                {this.renderRepoSearch()}
                {repos.map(repo => (
                    this.renderRepoItem(repo)
                ))}
            </React.Fragment>
        );
    }

    render() {
        return <div>{this.renderRepositorySummary()}</div>;
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchRepos: fetchRepos
    }, dispatch);
}


const mapStateToProps = state => ({
    repos: state.repos.repos
});


export default connect(mapStateToProps, mapDispatchToProps)(Repos);
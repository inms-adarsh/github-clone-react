import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from "react-router-dom";
import { Button, Pane, Avatar, Heading, Icon, Text, majorScale, minorScale } from 'evergreen-ui'

import Repos from "./Repos.js";
import { fetchProfile } from '../store/repos/reposActions'

class Profile extends Component {

    componentDidMount() {
        this.props.fetchProfile(this.props.match.params.username);
    }

    renderProfile(currentUser) {
        return (
            <React.Fragment>
                <Avatar width="100%" height={majorScale(28)} borderRadius={10} src={currentUser.avatar_url} />
                <Pane marginTop={majorScale(2)} marginBottom={majorScale(1)} display="flex" flexDirection="column" borderBottom="muted" paddingBottom={majorScale(3)}>
                    <Heading size={800}>{currentUser.name}</Heading>
                    <Text size={500}>{currentUser.login}</Text>
                    <Button marginTop={majorScale(2)} appearance="default">Follow</Button>
                </Pane>
                <Pane display="flex" marginTop={minorScale(2)} flexDirection="column">
                    <Text size={300}>{currentUser.bio}</Text>
                    <Text size={300} marginBottom={majorScale(1)} marginTop={majorScale(2)} marginRight={minorScale(4)}>
                        <Icon icon="git-repo" marginRight={minorScale(1)} size={minorScale(3)}></Icon>
                        Github
                    </Text>
                    <Text size={300} marginBottom={majorScale(1)} marginRight={minorScale(4)}>
                        <Icon icon="geolocation" marginRight={minorScale(1)} size={minorScale(3)}></Icon>
                        {currentUser.location}
                    </Text>
                    <Text size={300} marginRight={minorScale(4)}>
                        <Icon icon="link" marginRight={minorScale(1)} size={minorScale(3)}></Icon>
                        {currentUser.blog}
                    </Text>
                </Pane>
            </React.Fragment>
        );
    }

    render() {
        const { currentUser } = this.props;
        return (
            <React.Fragment>
                <Pane clearfix border="none">
                    <Pane
                        float="left"
                        backgroundColor="white"
                        width="25%"
                        display="flex"
                        flexDirection="column"
                        border="none"
                    >
                        {this.renderProfile(currentUser)}
                    </Pane>
                    <Pane
                        float="left"
                        width="75%"
                        padding={majorScale(1)}
                        display="flex"
                        flexDirection="column"
                        border="none"
                    >
                        <Route path="/:username/repo" component={Repos} />
                    </Pane>
                </Pane>
            </React.Fragment>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchProfile: fetchProfile
    }, dispatch);
}


const mapStateToProps = state => ({
    currentUser: state.repos.currentUser
});


export default connect(mapStateToProps, mapDispatchToProps)(Profile);

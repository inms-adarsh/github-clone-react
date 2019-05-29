import React from "react";
import { NavLink } from "react-router-dom";

import { Button, Pane, Avatar, majorScale, Text, minorScale } from 'evergreen-ui'
const ProfileList = props => (
    <React.Fragment>
        {props.profileListData.map((user, index) => (
            <Pane key={user.id} display="flex" alignItems="center" padding={majorScale(1)} borderBottom="muted">
                <Pane display="flex" flex={1} flexDirection="row" alignItems="center" background="none" borderRadius={3}>
                    <NavLink to={`/${user.login}/repo`}>
                        <Avatar
                            src={user.avatar_url}
                            name={user.login}
                            width={majorScale(8)}
                            height={majorScale(8)}
                            borderRadius={3}
                        />
                    </NavLink> 
                    <Text marginLeft={minorScale(3)} size={400}><NavLink className="App-link" to={`/${user.login}/repo`}>{user.login}</NavLink></Text>
                </Pane>
                <Pane>
                    {/* Below you can see the marginRight property on a Button. */}
                    <Button marginRight={majorScale(2)}>Follow</Button>
                </Pane>
            </Pane>
        ))}
    </React.Fragment>
);

export default ProfileList;

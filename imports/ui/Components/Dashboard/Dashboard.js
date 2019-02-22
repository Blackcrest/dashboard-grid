import React from 'react';

import TabControl from '../TabControl/TabControl';
import Grid from './Grid';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dashboardTabs: [{id: 0, name: "Dashboard 1"}, {id: 1, name: "Dashboard 2"}],
            selectedDashboard: 0,
        }
    }

    goToDashboard = (id) => {

    }

    render() {
        return (
            <div className="content">
                <TabControl tabs={this.state.dashboardTabs} 
                            selectedTab={this.state.selectedDashboard} />
                <div className="dashboard">
                    {this.state.dashboardTabs.length > 0 ? <Grid gridNumber={0} /> : "There are no tabs"}
                </div>
            </div>
        );
    }
};
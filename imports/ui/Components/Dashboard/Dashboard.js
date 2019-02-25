import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import TabControl from '../TabControl/TabControl';
import Grid from './Grid';

import { Tabs } from '../../../api/tabs';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dashboardTabs: [],
            selectedDashboard: 0,
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({...nextProps});
    }

    goToDashboard = (id) => {
        this.setState({selectedDashboard: id});
    }

    render() {
        return (
            <div className="content">
                <TabControl tabs={this.state.dashboardTabs} 
                            selectedTab={this.state.selectedDashboard}
                            callback={this.goToDashboard} />
                <div className="dashboard">
                    {this.state.dashboardTabs.length > 0 ? <Grid gridNumber={0} /> : "There are no tabs"}
                </div>
            </div>
        );
    }
};

export default withTracker(() => {
    Meteor.subscribe('tabs');

    const tabs = Tabs.find({}).map((tab, idx) => {
        return { ...tab, tabId: idx };
    })

    return{
        dashboardTabs: tabs
    }
})(Dashboard);
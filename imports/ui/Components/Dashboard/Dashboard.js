import React from 'react';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

import TabControl from '../TabControl/TabControl';
import Grid from './Grid';

import { Tabs } from '../../../api/tabs';
import { DashboardItems } from '../../../api/dashboard';

export class DashboardOverview extends React.Component {
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

    renderGrids = () => {
        return <Grid  data={this.props.dashboardItems}
                      gridNumber={0} />
    }

    render() {
        return (
            <div className="content">
                <TabControl tabs={this.state.dashboardTabs} 
                            selectedTab={this.state.selectedDashboard} />
                
                {this.renderGrids()}
            </div>
        );
    }
};

export default withTracker(() => {
    Meteor.subscribe('tabs');
    Meteor.subscribe('dashboard');

    const tabs = Tabs.find({}).map(tab => {
        return { ...tab };
    })
    const firstTabId = tabs.length > 0 ? tabs[0]._id : 0;
    let tabId;

    if( Session.get('tabId') === undefined || Session.get('tabId') === 0){
        tabId = firstTabId;
    } else{
        tabId = Session.get('tabId');
    }

    const dashboardItems = DashboardItems.find({tabId}).map(item => {
        return { ...item };
    });

    return{
        dashboardTabs: tabs,
        selectedDashboard: tabId,
        dashboardItems
    }
})(DashboardOverview);
import React from 'react';

import Tab from './Tab';

export default class TabControl extends React.Component {    
    createDashboard = () => {
        console.log('creating a dashboard')
        // create a tab in mongo

        // update  the selected dashboard
    }

    navigateToTab = (id) => {

    }

    renderTabs = () => {
        return this.props.tabs.map(tab => {
            return <Tab key={"tab-" + tab.id} 
                        active={this.props.selectedTab === tab.id ? true : false}
                        id={tab.id}
                        name={tab.name}/>;
        })
    }

    render() {
        return (
            <div className="tab-control">
                <button onClick={this.createDashboard}>
                    Create Dashboard
                </button>
                <div className="tab-control__content">
                    {this.props.tabs.length !== 0 ? this.renderTabs() : "There are no tabs here" }
                </div>
            </div>
        );
    }
};
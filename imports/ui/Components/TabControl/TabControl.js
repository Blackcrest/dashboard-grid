import React from 'react';

import Tab from './Tab';

export default class TabControl extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            addingTab: false,
            newTabName: ''
        }
    }

    escFunction = (e) => {
        if(!this.state.addingTab)
            return;

        if(e.keyCode === 27) {
            this.setState({
                addingTab: false,
                newTabName: ''
            })
        }

        if(e.keyCode === 13 && this.state.newTabName.length > 0){
            Meteor.call('tabs.insert', this.state.newTabName, (err, res) => {
                if(err){
                    console.log(err)
                } else if(res){
                    this.navigateToTab(res);
                }
            }); 
            
            this.setState({
                addingTab: false,
                newTabName: ''
            })
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", this.escFunction, false);
    }
    
    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);
    }

    createDashboard = () => {
        this.setState({addingTab: !this.state.addingTab}, () => {
            this.refs.name.focus();
        })
    }

    unfocusInput = () => {
        this.setState({addingTab: !this.state.addingTab});
    }

    onInputChange = (e) => {
        this.setState({newTabName: e.target.value});
    }

    navigateToTab = (id) => {
        this.props.callback(id)
    }

    renderTabs = () => {
        return this.props.tabs.map(tab => {
            return <Tab key={"tab-" + tab._id} 
                        active={this.props.selectedTab === tab.tabId ? true : false}
                        id={tab.tabId}
                        name={tab.name}
                        onClickEvent={this.navigateToTab}/>;
        })
    }

    render() {
        return (
            <div className="tab-control">
                <div className="tab-control__create-container">
                    {this.state.addingTab ? 
                        <input className="tab-control__create-input"
                               type="text" 
                               placeholder="Dashboard name" 
                               ref="name"
                               onBlur={this.unfocusInput}
                               value={this.state.newTabName}
                               onChange={this.onInputChange} />
                        : 
                        <button className="tab-control__create-button" onClick={this.createDashboard}>
                            Create Dashboard
                        </button>
                    }
                </div>
                <div className="tab-control__tabs">
                    {this.props.tabs.length !== 0 ? this.renderTabs() : "There are no tabs here" }
                </div>
            </div>
        );
    }
};
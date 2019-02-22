import React from 'react';

export default class Tab extends React.Component {
    render() {
        return(
            <div className={"tab" + (this.props.active ? " tab--active" : "")}>
                {this.props.name}
            </div>
        )
    }
}
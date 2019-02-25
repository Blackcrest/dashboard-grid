import React from 'react';

export default class Tab extends React.Component {
    handleClick = () => {
        if(this.props.onClickEvent)
            this.props.onClickEvent(this.props.id)
    }

    render() {
        return(
            <div className={"tab" + (this.props.active ? " tab--active" : "")}
                 onClick={this.handleClick}>
                {this.props.name}
            </div>
        )
    }
}
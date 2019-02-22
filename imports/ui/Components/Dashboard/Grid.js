import React from 'react';

export default class Grid extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            gridHeight: null
        }
    }

    componentDidMount() {
        let gridHeight = document.getElementById("grid-" + this.props.gridNumber).clientHeight;

        this.setState({ gridHeight });
    }

    renderGrid = () => {
        let grid = [];
        let gridRow = 0;
        let height = 877;
        

        for(height; height > 75; height -= 75){
            grid.push(this.renderRow(gridRow));
            gridRow++;
        }

        return grid;
    }

    renderRow = (gridRow) => {
        let grid = []

        for(var i = 0; i <= 3; i++){
            grid.push(<div key={"grid-" + gridRow + "-" + i} className="grid__block">block</div>)
        }

        return grid;
    }

    render() {
        return (
            <div className="grid" id={"grid-" + this.props.gridNumber }>
                {this.renderGrid()}
            </div>
        );
    }
};
import React from 'react';

export default class Grid extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            gridData: [
                { id: 0, name: "Small 1", type: "small" },
                { id: 1, name: "Small 2", type: "small" },
                { id: 2, name: "Small 3", type: "small"},
                { id: 4, name: "Medium 1", type: "medium"},
                { id: 7, name: "Wide 1", type: "wide"},
                { id: 5, name: "Medium 2", type: "medium"},
                { id: 8, name: "Small 6", type: "small" },
                { id: 9, name: "Small 7", type: "small"},
                { id: 10, name: "Small 8", type: "small"},
                { id: 11, name: "Small 9", type: "small" },
                { id: 12, name: "Small 10", type: "small"},
                { id: 13, name: "Small 11", type: "small"},
                { id: 14, name: "Small 12", type: "small" },
                { id: 16, name: "Small 13", type: "small"},
                { id: 17, name: "Small 14", type: "small"},
                { id: 18, name: "Small 15", type: "small"},
                { id: 19, name: "Small 16", type: "small" },
                { id: 20, name: "Small 17", type: "small"}
            ]
        }
    }

    renderGrid = () => {
        let grid = [];
        let col = 1;
        let row = 1;

        this.state.gridData.map((gridItem, idx) => {
            if(row > 8)
                return;

            let uniqueClass = row % 2 == 0 ? " col-" + col + " row-" + row : '';

            grid.push(<div key={gridItem.id}
                           className={"grid-tile grid-tile__" + gridItem.type + uniqueClass}>
                           {gridItem.name}</div>);

            let updatedVars = this.updateColAndRow(this.state.gridData[idx], this.state.gridData[idx+1], col, row);
            
            col = updatedVars.col;
            row = updatedVars.row;
        })

        return grid;
    }


    updateColAndRow(prevItem ,nextItem, col, row){
        if(nextItem === undefined)
            return {col, row};
        
        let updatedCol = col;
        let updatedRow = row;

        if(nextItem.type === 'small'){
            if(col === 2){
                if(row % 2 == 0){
                    updatedCol = 3;
                    updatedRow--;
                }else{
                    updatedCol--;
                    updatedRow++;
                }
            } else if(col === 4){
                if(row % 2 == 0){
                    updatedCol = 1;
                } else{
                    updatedCol--;
                }
                updatedRow++;
            } else {
                updatedCol++;
            }
            
            if(prevItem.type === 'wide'){
                updatedRow = updatedRow + 2;
            } else if(prevItem.type === 'medium'){
                if(col < 3){
                    updatedCol++;
                } else{
                    updatedCol = updatedCol + 2;
                }
            } 
        } else if(nextItem.type === 'medium'){
            if(row % 2 == 0){
                updatedRow--;
            } 

            if(col <= 2 && prevItem.type !== 'wide'){
                updatedCol = 3;
            } else{
                updatedCol = 1;
                updatedRow = updatedRow + 2;
            }
        } else if(nextItem.type === 'wide'){
            if(col > 1){
                updatedCol = 1;
            }

            if(row % 2 == 0){
                updatedRow++;
            } else{
                updatedRow = updatedRow + 2;
            }
        }

        console.log("Position of " + nextItem.name +":", {col: updatedCol, row: updatedRow})

        return {col: updatedCol, row: updatedRow};
    }

    render() {
        return (
            <div className="grid" id={"grid-" + this.props.gridNumber }>
                {this.renderGrid()}
            </div>
        );
    }
};
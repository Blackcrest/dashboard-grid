import React from 'react';

export default class Grid extends React.Component {
    renderGrid = () => {
        let grids = []

        const data = this.calculatePositions();

        if(data === undefined){
            grids.push(<div key="no-data">
                <h3>There is no data.</h3>
                <p>Please add a tile using one of the buttons in the action bar above.</p>
            </div>)
        } else{
            data.map((gridData, idx) => {
                grids.push(<div key={"grid-" + idx } className="grid" id={"grid-" + idx }>
                                {this.renderTiles(gridData)}
                           </div>)
            })
        }

        return grids;
    }

    calculatePositions = () => {
        let updatedData = []
        let tempData = [];
        let col = 1;
        let row = 1;

        if(this.props.data.length === 0)
            return;

        this.props.data.map((dataItem, idx) => {
            tempData.push({
                ...dataItem,
                col,
                row
            })
            
            let updatedVars = this.updateColAndRow(this.props.data[idx], 
                this.props.data[idx+1], 
                col, 
                row);

            col = updatedVars.col;
            row = updatedVars.row; 

            if(row > 8 || (this.props.data.length - 1) === idx){
                updatedData.push({...tempData})
    
                col = 1;
                row = 1;
    
                tempData = [];
            } 
        })

        return updatedData;
    }

    renderTiles = (tileData) => {
        let tileCollection = [];

        if(tileData.length === 0){
            console.log('empty tiles')
        }

        for(var id in tileData){
            let uniqueClass = tileData[id].type === 'small'? " col-" + tileData[id].col + " row-" + tileData[id].row : '';

            tileCollection.push(<div key={tileData[id]._id}
                                     className={"grid-tile grid-tile__" + tileData[id].type + uniqueClass}>
                                </div>);
        }

        return tileCollection;
    }


    updateColAndRow(prevItem ,nextItem, col, row){
        if(nextItem === undefined)
            return {col, row};
        
        let updatedCol = col;
        let updatedRow = row;

        if(nextItem.type === 'small'){
            if(prevItem.type === 'wide'){
                updatedRow = updatedRow + 2;
            } else if(prevItem.type === 'medium'){
                if(col < 3){
                    updatedCol = col % 2 == 0 ? updatedCol + 1 : updatedCol + 2; 
                } else{
                    updatedCol = 1;
                    updatedRow = updatedRow + 2;
                }
            } else {
                if(col === 2){
                    updatedCol = row % 2 == 0 ? 3 : updatedCol - 1 ;
                    updatedRow = row % 2 == 0 ? updatedRow - 1 : updatedRow + 1;
                } else if(col === 4){
                    updatedCol = row % 2 == 0 ? 1 : updatedCol - 1 ;
                    updatedRow++;
                } else {
                    updatedCol++;
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

        return {col: updatedCol, row: updatedRow};
    }

    render() {
        return (
            <div className="dashboard">
                {this.renderGrid()}
            </div>
        );
    }
};
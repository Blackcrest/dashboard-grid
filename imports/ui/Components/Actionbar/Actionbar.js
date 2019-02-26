import React from 'react';

import Button from '../Button/Button';

export default class Actionbar extends React.Component {
    addTile = (type) => {
        Meteor.call('item.insert', Session.get('tabId'), type, (err, res) => {
            if(err){
                console.log(err)
            } else if(res){
                console.log('adding ' + type + ' tile!')
            }
        });
    }

    render() {
        return (
            <div className="actionbar">
                <Button action={() => this.addTile('small')} 
                        name="Add Small Tile" />
                <Button action={() => this.addTile('medium')} 
                        name="Add Medium Tile" />
                <Button action={() => this.addTile('wide')} 
                        name="Add Wide Tile" />
            </div>
        );
    }
};
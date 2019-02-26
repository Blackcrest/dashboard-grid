import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const DashboardItems = new Mongo.Collection('dashboard');

if(Meteor.isServer){
    Meteor.publish('dashboard', function() {
        return DashboardItems.find({});
    })
}

Meteor.methods({
    'item.insert'(tabId, type) {
        return DashboardItems.insert({tabId, type})
    },
    'item.remove'(id) {
        
    }
});
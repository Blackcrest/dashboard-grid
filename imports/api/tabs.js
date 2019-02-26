import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const Tabs = new Mongo.Collection('tabs');

if(Meteor.isServer){
    Meteor.publish('tabs', function() {
        return Tabs.find({});
    })
}

Meteor.methods({
    'tabs.insert'(name) {
        return Tabs.insert({name})
    },
    'tabs.remove'(id) {
        
    }
});
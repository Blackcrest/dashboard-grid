import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDom from 'react-dom';

import Dashboard from '../imports/ui/Dashboard'
import '../imports/startup/simple-schema-configuration.js';

componentDidMount = () => {
    
}

Meteor.startup(() => {
    ReactDom.render(<Dashboard />, document.getElementById('app'));
});
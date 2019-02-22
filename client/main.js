import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDom from 'react-dom';

import App from '../imports/ui/App'
import '../imports/startup/simple-schema-configuration.js';

componentDidMount = () => {
    
}

Meteor.startup(() => {
    ReactDom.render(<App />, document.getElementById('app'));
});
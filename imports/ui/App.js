import React from 'react';

import Actionbar from './Components/Actionbar/Actionbar';
import Dashboard from './Components/Dashboard/Dashboard';


export default () => {
    return (
        <div>
            <div className="wrapper">
                <Actionbar />
                <Dashboard />
            </div>
        </div>
    );
};
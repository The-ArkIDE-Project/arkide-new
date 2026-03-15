import React from 'react';
import GUI from '../containers/gui.jsx';

const searchParams = new URLSearchParams(location.search);
const cloudHost = searchParams.get('cloud_host') || 'wss://clouddata.arkide.site';

const RenderGUI = props => (
    <GUI
        cloudHost={cloudHost}
        username={searchParams.get('username')}
        canSave={true}
        basePath={process.env.ROOT}
        canEditTitle
        enableCommunity
        {...props}
    />
);

export default RenderGUI;

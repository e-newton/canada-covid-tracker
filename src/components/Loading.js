import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css'
import './loading.css'


function Loading(props) {
    return (
        <div>
            <div className={"spinner-border spinner"} role="status">
                <span className={"sr-only"}>Loading...</span>
            </div>
        </div>
    );
}

export default Loading;

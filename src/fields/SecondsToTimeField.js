import PropTypes from "prop-types";
import React from "react";

const SecondsToTimeField = ({ source, record = {} }) => {

    let dt = typeof record[source] !== 'undefined' ? new Date( record[source] * 1000).toISOString().substr(11, 8) : null;


    return (
        <span style={{fontSize: '13px', color: '#03193d'}}>{dt }</span>
    )

}


    SecondsToTimeField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

    // допилим текстовое представление


export default SecondsToTimeField;
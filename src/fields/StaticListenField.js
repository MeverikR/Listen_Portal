import PropTypes from "prop-types";
import React from "react";
import { BooleanField } from 'react-admin';


const StaticListenField = (props) => {

    const { record } = props;

    if (record['call_records'].length > 0) {
        return (
            <BooleanField {...props} />
        )
    } else {
        return <span>&nbsp;</span>;
    }

};

    StaticListenField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};
    // допилим текстовое представление
export default StaticListenField;
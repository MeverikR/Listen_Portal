import PropTypes from "prop-types";
import React from "react";

const translateEnumField = {
    'first' : 'Первый качественный',
    'through' : 'Сквозной первый качественный',
    'primary' : 'Первичный',
    'secondary' : 'Вторичный',
    'lost' : 'Потерянный',
    'target' : 'Целевой',
    'off-target' : 'Не целевой',
    'quality' : 'Качественный',
    'rest' : 'Целевой повторный'
}

const EnumField = ({ source, record = {} }) => {
    return (
        <React.Fragment>
            {record[source].map(item => (
                <p key={item}>{translateEnumField.hasOwnProperty(item) ? translateEnumField[item] : 'неизвестный'}</p>
            ))}
        </React.Fragment>
    )
}

EnumField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

EnumField.defaultProps = { addLabel: true };

export default EnumField;

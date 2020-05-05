import PropTypes from "prop-types";
import React from 'react';
import { SelectArrayInput } from 'react-admin';


const FieldsSelectField = ({  record = {}, source }) =>
    (
        <SelectArrayInput label="Выберите поля (колонки) отчета о звонках" source="params.fields"
                          choices={JSON.parse(localStorage.getItem('current_user')).client.fields_available} 
                          style={{minWidth: "600px"}} />
    )

    FieldsSelectField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

    // допилим текстовое представление


export default FieldsSelectField;
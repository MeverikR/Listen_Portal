import PropTypes from "prop-types";
import React from 'react';
import { SelectArrayInput } from 'react-admin';


/*
const TagsSelectField = ({  record = {}, source }) => {
    const dataProvider = jsonServerProvider('http://127.0.0.1:5556', httpClient);
    const client_id = JSON.parse(localStorage.getItem('current_user')).client.id
    let tags = []
    dataProvider(GET_LIST, 'tags', {
        filter: { client_id: client_id },
        pagination: { page: 1, perPage: 500 },
        sort: { field: 'name', order: 'ASC' },
    })

    .then(response => {
        return    (
            <SelectArrayInput label="Выберите теги, которые пользователь сможет добавлять к звонку"
             source="params.tags"
                              choices={response.data} />
        )
       
    });
    

} 
*/

const TagsSelectField = ({  record = {}, source }) =>
    (
        <SelectArrayInput label="Выберите теги, которые пользователь сможет добавлять к звонку" source="params.tags"
                          choices={JSON.parse(localStorage.getItem('current_user')).client.tags_available} 
                          style={{minWidth: "600px"}}/>
    )

    TagsSelectField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

    // допилим текстовое представление


export default TagsSelectField;
import PropTypes from "prop-types";
import React from 'react';
import { ArrayInput, SimpleFormIterator, TextInput, SelectInput, required  } from 'react-admin';


const FiltersSelectField = ({  record = {}, source }) =>
    (
       <ArrayInput source="params.filters" label="Задайте фильтры по полям">
            <SimpleFormIterator>
                <ArrayInput source="filters" label="Группа фильтров" validate={required()} style={{padding: '15px'}}>
                    <SimpleFormIterator>
                          <SelectInput source="field" label="Поле отчета" validate={required()} choices={JSON.parse(localStorage.getItem('current_user')).client.fields_available} />
                          <SelectInput source="operator" label="Оператор" validate={required()} choices={[
                                    { id: '=', name: 'Равно' },
                                    { id: '!=', name: 'Не равно' },
                                    { id: '<', name: 'Менше чем' },
                                    { id: '>', name: 'Больше чем' },
                                    { id: '<=', name: 'Меньше или равно' },
                                    { id: '>=', name: 'Больше или равно' },
                                    { id: 'like', name: 'Содержит' },
                            ]} />
                            <TextInput label="Значение" source="value"  validate={required()}/>
                </SimpleFormIterator>
                </ArrayInput>
              <SelectInput label="Условие группы" source="condition" choices={[
                                    { id: 'and', name: 'И' },
                                    { id: 'or', name: 'ИЛИ' },

                            ]} validate={required()} />
          </SimpleFormIterator>
       </ArrayInput>
    )

    FiltersSelectField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

    // допилим текстовое представление


export default FiltersSelectField;
import React from 'react';
import {
    List, Datagrid,
    TextField, NumberField,
    BooleanField, Filter, TextInput
} from 'react-admin';


const TagFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Быстрый поиск" source="q" alwaysOn/>
    </Filter>
);

const TagListTitle = ({record}) => {
    let user = JSON.parse(localStorage.getItem('current_user'));
    return <span>{user.client.name}: Список тегов клиента в ЛК CoMagic  </span>;
};


export const TagList = props => (
    <List {...props} bulkActions={false} title={<TagListTitle/>} filters={<TagFilter/>}>
        <Datagrid rowClick="edit">
            <NumberField label="ID Тега" source="id" />
            <TextField label="Тег" source="name" />
            <BooleanField label="Системный" source="is_system" sortable={false} />
            
        </Datagrid>
    </List>
);
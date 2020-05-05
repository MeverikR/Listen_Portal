import React from 'react';
import {
    List, Datagrid,
    TextField, EmailField,
    NumberField, DateField,
    EditButton, DeleteButton,
    Filter, TextInput,
} from 'react-admin';
import UserGroupField from './fields/UserGroupField';
import {exporterUsers} from './exporters/usersCSVExporter';



const currentUserRowStyle = (record, index) => ({

    backgroundColor: (parseInt(JSON.parse(localStorage.getItem('current_user')).id) === parseInt(record['id'])) ? '#db88ff' : 'white',

});

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Быстрый поиск" source="q" alwaysOn/>
    </Filter>
);
const UserListTitle = ({record}) => {
    let user = JSON.parse(localStorage.getItem('current_user'));
    return <span>{user.client.name}: Список пользователей  </span>;
};


/* Выводим список пользователей */
export const UserList = (props)=>

    <List title={<UserListTitle/>} filters={<UserFilter/>} exporter={exporterUsers} {...props}>
        <Datagrid rowStyle={currentUserRowStyle}>
            <NumberField label="ID" source="id"/>
            <TextField label="Имя" source="name"/>
            <TextField label="Логин" source="login"/>
            <EmailField label="E-mail" source="email_address"/>
            <UserGroupField label="Группа" source="group_id"/>
            <TextField label="Комментарий" source="comment"/>
            <DateField label="Создан" source="created_at"/>
            <DateField label="Последнее изменение" source="updated_at"/>
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>

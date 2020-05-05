import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    NumberField,
    DateField,
    Filter,
    TextInput,
    EditButton,
    DeleteButton,
} from 'react-admin';


import  { exporterClients } from './exporters/clientCSVExporter';

const ClientFilter = (props) => (
     <Filter {...props}>
        <TextInput label="Быстрый поиск" source="q" alwaysOn />
     </Filter>
);

export const ClientList = props => (
    <List {...props} title={"Список кабинетов"} filters={<ClientFilter />} exporter={exporterClients}>
        <Datagrid rowClick="edit">
            <TextField source="id" label="ID" />
            <TextField source="name" label="Название" />
            <NumberField source="infopin" label="Инфопин ID" />
            <NumberField source="app_id" label="APP ID" />

            
                <TextField source="main_user.name" label="Администратор" sortable={false} />

            <TextField label="Токен" source="token" />
            <TextField label="Всего пользователей" source="users.count" sortable={false} />
            <DateField label="Дата создания" source="created_at" />
            <DateField label="Дата изменения" source="updated_at" />
             <EditButton />
             <DeleteButton />
        </Datagrid>
    </List>
);


import React from "react";

import {TextInput, Edit, TabbedForm, FormTab} from 'react-admin';
import  InputHiddenField  from '../fields/InputHiddenField';


const required = (message = 'validation.required') =>
    (value, allValues, props) => value ? undefined : props.translate(message);

const ClientEditTitle = ({record}) => {
    return <span>Изменение клиента {record ? `№${record.id} "${record.name}"` : ''}</span>;
};


export const ClientEditForm = ({permissions, ...props}) => (
    <Edit {...props} title={<ClientEditTitle/>}>
        <TabbedForm>
            <FormTab label="Основные">
                <TextInput label="Имя клиента" source="name" validate={required()}/>
                <TextInput label="Инфопин ID" locales="ru-RU" source="infopin" 
                    format={v => v ? (v === ' ' ||  v.toString().replace(/[^0-9]/g, '') === null ? '' : (v.length < 10 ? v : v.toString().substring(0,10)).replace(/[^0-9]/g, '')) : ""} 
                /><br/>
                <TextInput label="APP ID" locales="ru-RU" source="app_id" 
                    format={v => v ? (v === ' ' ||  v.toString().replace(/[^0-9]/g, '') === null ? '' : (v.length < 10 ? v : v.toString().substring(0,10)).replace(/[^0-9]/g, '')) : ""} 
                /><br/>
                <TextInput label="Токен" source="token" validate={required()} resettable/>
            </FormTab>
            <FormTab label="Администратор">
                <TextInput label="Имя" source="main_user.name" validate={required()} />
                <TextInput label="Логин" source="main_user.login" validate={required()}  />
                <TextInput label="Пароль" source="main_user.password" validate={required()}  />
                <InputHiddenField source="main_user.id" />
            </FormTab>
        </TabbedForm>
    </Edit>
);
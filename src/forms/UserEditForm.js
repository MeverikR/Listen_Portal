import React from "react";

import { TextInput, LongTextInput, Edit, TabbedForm, FormTab, BooleanInput, required } from 'react-admin';
/* редактор полей */
import  FieldsSelectField  from '../fields/FieldsSelectField';
/* редактор тэгов */
import  TagsSelectField  from '../fields/TagsSelectField';
/* редактор фильтров */
import  FiltersSelectField  from '../fields/FiltersSelectField';
/* скрытые поля для связи */
import  InputHiddenField  from '../fields/InputHiddenField';

// TODO: получить полные списки тегов, полей, фильтров


const UserEditTitle = ({ record }) => {
    let user = JSON.parse(localStorage.getItem('current_user'));
    return <span>{user.client.name}: Редактирование пользователя {record ? `№${record.id} "${record.name}"` : ''}</span>;
};


const re_name = /[\d\sA-Zа-яё]/gi
const re_login = /[\d\sA-Z_]/gi
const re_password = /[^\sа-яё]/gi
const re_email = /[\d\sA-Z@._]/gi
const styleForHints = {width: '80%', color: 'darkgray', fontSize: '0.8rem', padding: '5px'}
export const UserEditForm = ( props) => {
    return (
    <Edit {...props} title={<UserEditTitle/>}>
        <TabbedForm>
            <FormTab label="Основные данные">
                <br /><div style={styleForHints}>{"Логин должен содержать не более 20 символов - латинские буквы и цифры"}</div>
                <div style={styleForHints}>{"Пароль должен содержать не более 20 символов - любые символы, латинские буквы и цифры"}</div>
                <div style={styleForHints}>{"Email должен содержать не более 50 символов - латинские буквы и цифры, @ и ."}</div><br />
                <TextInput label="ФИО" source="name" validate={required()} 
                    format={v => v ? (v === ' ' ||  v.match(re_name) === null ? '' : (v.indexOf(' ') === -1 ? v : (v.indexOf(' ') === 0 ? v.substring(1) : v.replace('  ', ' '))).match(re_name).join('').substring(0,30)) : ""}/>
                <TextInput label="Логин" source="login" validate={required()} 
                    format={v => v ? (v === ' ' ||  v.match(re_login) === null ? '' : (v.indexOf(' ') === -1 ? v : (v.indexOf(' ') === 0 ? v.substring(1) : v.replace(' ', ''))).match(re_login).join('').substring(0,20)) : ""}/>
                <TextInput label="Пароль" source="password" validate={required()}
                    format={v => v ? (v === ' ' ||  v.match(re_password) === null ? '' : (v.indexOf(' ') === -1 ? v : (v.indexOf(' ') === 0 ? v.substring(1) : v.replace(' ', ''))).match(re_password).join('').substring(0,20)) : ""}/>
                <TextInput label="E-mail" source="email_address" 
                    format={v => v ? (v === ' ' ||  v.match(re_email) === null ? '' : (v.indexOf(' ') === -1 ? v : (v.indexOf(' ') === 0 ? v.substring(1) : v.replace(' ', ''))).match(re_email).join('').substring(0,50)) : ""}/>
                <LongTextInput label="Комментарий" source="comment" style={{width: '60%'}}
                    format={v => v ? v.length < 200 ? v : v.substring(0,200) : ""} />

            </FormTab>
            <FormTab label="Настройки тегов" path="tags">
                <TagsSelectField source="params.tags"/>
            </FormTab>

            <FormTab label="Настройки полей" path="fields">
                <FieldsSelectField source="params.fields"/>
            </FormTab>
            <FormTab label="Фильтры" path="filters">
                <FiltersSelectField source="params.filters"/>
            </FormTab>
            <FormTab label="Дополнительно" path="other">
                <BooleanInput label="Разрешить добавлять новые теги" source="params.allow_tags_add"/>
                <BooleanInput label="Разрешить удалять теги" source="params.allow_tags_delete"/>
                <BooleanInput label="Скрыть ID" source="params.hide_sys_id"/>
                <BooleanInput label="Скрыть АОН" source="params.hide_sys_aon"/>
                <BooleanInput label="Скрыть плеер" source="params.hide_sys_player"/>
                <BooleanInput label="Скрыть статистику прослушивания в отчете 'Звонки'" source="params.hide_sys_static"/>
                <BooleanInput label="Включить проверку удаленных тегов" source="params.enable_deleted_tags_check"/>
                <InputHiddenField source="params.id"/>
                <InputHiddenField source="params.user_id"/>
            </FormTab>

        </TabbedForm>
    </Edit>
    )}
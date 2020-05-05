import React from "react";

import {
    TextInput, BooleanInput,
    Create,  TabbedForm, FormTab,
    SelectInput, LongTextInput } from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// TODO: получить полные списки тегов, полей, фильтров

const required = (message = 'Обязательно к заполнению') =>
    (value, allValues, props) => value ? undefined : props.translate(message);

const UserAddTitle = ({ record }) => {
    let user = JSON.parse(localStorage.getItem('current_user'));

    return <span>{user.client.name}: Добавление пользователя</span>;
};

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

const re_name = /[\sA-Zа-яё]/gi
const re_login = /[\d\sA-Z_]/gi
const re_password = /[^\sа-яё]/gi
const re_email = /[\d\sA-Z@._]/gi
const styleForHints = {width: '80%', color: 'darkgray', fontSize: '0.8rem', padding: '10px'}    
/* Форма добавления юзера */
export const UserAddForm = withStyles(styles)(({classes, permissions, ...props}) =>
    <Create title={<UserAddTitle/>}  {...props}>
         <TabbedForm>
            <FormTab label="Основные">
                <Grid container className={classes.root}>
                        <Grid item xs={6}>
                            <br /><div style={styleForHints}>{"Логин должен содержать не более 20 символов - латинские буквы и цифры"}</div>
                            <div style={styleForHints}>{"Пароль должен содержать не более 20 символов - любые символы, латинские буквы и цифры"}</div>
                            <div style={styleForHints}>{"Email должен содержать не более 50 символов - латинские буквы и цифры, @ и ."}</div><br />
                            <TextInput label="Имя" source="name" validate={required()} style={{marginRight: '20px'}}
                                format={v => v ? 
                                    (v === ' ' ||  v.match(re_name) === null ? '' : (v.indexOf(' ') === -1 ? v : (v.indexOf(' ') === 0 ? v.substring(1) : v.replace('  ', ' '))).match(re_name).join('').substring(0,30))
                                    : ""} /><br /> 

                            <TextInput source="login" label="Логин"  validate={required()} style={{marginRight: '20px'}}
                                format={v => v ? (v === ' ' ||  v.match(re_login) === null ? '' : (v.indexOf(' ') === -1 ? v : (v.indexOf(' ') === 0 ? v.substring(1) : v.replace(' ', ''))).match(re_login).join('').substring(0,20))
                                : ""} /><br/>
                            
                            <TextInput source="password" label="Пароль" validate={required()} style={{marginRight: '20px'}}
                                format={v => v ? (v === ' ' ||  v.match(re_password) === null ? '' : (v.indexOf(' ') === -1 ? v : (v.indexOf(' ') === 0 ? v.substring(1) : v.replace(' ', ''))).match(re_password).join('').substring(0,20))
                                : ""} /><br />
                            
                            <TextInput source="email_address" label="E-mail" style={{marginRight: '20px'}}
                                format={v => v ? (v === ' ' ||  v.match(re_email) === null ? '' : (v.indexOf(' ') === -1 ? v : (v.indexOf(' ') === 0 ? v.substring(1) : v.replace(' ', ''))).match(re_email).join('').substring(0,50))
                                : ""} /><br/>
                            <LongTextInput source="comment" label="Описание" style={{width: '60%'}}
                                format={v => v ? v.length < 200 ? v : v.substring(0,200) : ""}/>
                        
                        </Grid>
                        <Grid item xs={6}>
                            <SelectInput source="group_id" label="Тип пользователя" validate={required()} choices={[
                                        { id: '1', name: 'Администратор' },
                                        { id: '2', name: 'Слушатель' },
                                    ]} /><br/>

                            <BooleanInput source="params.allow_tags_add" label="Разрешить добавление произвольных тегов"/>
                            <BooleanInput source="params.allow_tags_delete" label="Разрешить снятие тегов с обращений" />
                            <BooleanInput label="Скрыть ID" source="params.hide_sys_id"/>
                            <BooleanInput label="Скрыть АОН" source="params.hide_sys_aon"/>
                            <BooleanInput label="Скрыть плеер" source="params.hide_sys_player"/>
                            <BooleanInput label="Скрыть статистику прослушивания в отчете 'Звонки'" source="params.hide_sys_static"/>
                            <BooleanInput label="Включить проверку удаленных тегов" source="params.enable_deleted_tags_check"/>
                        </Grid>
                </Grid>
            </FormTab>
         </TabbedForm>
    </Create>
);


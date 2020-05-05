import React from "react";

import {TextInput, Create, TabbedForm, FormTab} from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const required = (message = 'Обязательно к заполнению') =>
    (value, allValues, props) => value ? undefined : props.translate(message);

const ClientAddTitle = ({record}) => {
    return <span>Добавление клиента</span>;
};

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

export const ClientAddForm = withStyles(styles)(({classes, permissions, ...props}) =>
    <Create {...props} title={<ClientAddTitle/>}>
        <TabbedForm>
            <FormTab label="Основные">
                 <Grid container className={classes.root}>
                    <Grid item xs={6}>
                <TextInput label="Имя клиента" source="name" validate={required()}/><br/>
                <TextInput label="Токен" source="token" validate={required()}/><br/>
                <br/>
                <TextInput label="Инфопин ID" locales="ru-RU" source="infopin" 
                    format={v => v ? (v === ' ' ||  v.replace(/[^0-9]/g, '') === null ? '' : (v.length < 10 ? v : v.substring(0,10)).replace(/[^0-9]/g, '')) : ''} /><br/>
                <TextInput label="APP ID" locales="ru-RU" source="app_id" 
                    format={v => v ? (v === ' ' ||  v.replace(/[^0-9]/g, '') === null ? '' : (v.length < 10 ? v : v.substring(0,10)).replace(/[^0-9]/g, '')) : ''} /><br/>
                    </Grid>
                     <Grid item xs={6}>
                    <TextInput label="Логин администратора" source="adm_login" validate={required()}/><br/>
                    <TextInput label="Пароль администратора" source="adm_pass" validate={required()}/><br/>
                    <TextInput label="E-mail админа" source="adm_email" />
                     </Grid>
                 </Grid>

            </FormTab>
        </TabbedForm>
    </Create>
);
// Компонент поля таблицы пользователей - поле Группа.
// Группы захардкожены. Может быть всего 2: админ или слушатель
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { DisabledInput } from 'react-admin';
const styles = {
    hidden: {
        display: 'none',
    }   
};

const InputHiddenField = ({record = {}, source, classes}) =>
    <DisabledInput className={classes.hidden} source={source}/>

export default withStyles(styles)(InputHiddenField);
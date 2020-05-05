// Компонент поля таблицы пользователей - поле Группа.
// Группы захардкожены. Может быть всего 2: админ или слушатель
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
const styles = {
    link: {
        textDecoration: 'none',
    },
    icon: {
        width: '0.8em',
        paddingLeft: 2,
    },
};

const UserGroupField = ({record = {}, source, classes}) =>
    <span>
        {
            record[source] === 2 ? (
                'Слушатель'
            ) : (
                'Админ'
            )}

        <span>{record[source] === 2 ?  <RecordVoiceOverIcon className={classes.icon} />   : <AccountBoxIcon className={classes.icon}/>}</span>
    </span>;

export default withStyles(styles)(UserGroupField);
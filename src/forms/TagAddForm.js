import React from "react";

import {TextInput, Create, SimpleForm} from 'react-admin';

import { withStyles } from '@material-ui/core/styles';

const required = (message = 'Обязательно к заполнению') =>
    (value, allValues, props) => value ? undefined : props.translate(message);

const TagAddTitle = ({record}) => {
    return <span>Добавление тега</span>;
};

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

export const TagAddForm = withStyles(styles)(({classes, permissions, ...props}) =>
    <Create {...props} title={<TagAddTitle/>}>
        <SimpleForm>
            <TextInput label="Название тега" source="name" validate={required()}/>
        </SimpleForm>
    </Create>
);
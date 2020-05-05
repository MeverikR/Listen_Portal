// Компонент для даты время.

import React from 'react';
import { DateField } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
const styles = {
    dtfield: {
        color: '#03193d',
        fontSize: '13px'
    }
};
const DateTimeField = ({ classes, ...props }) => <DateField locales="ru-RU" className={classes.dtfield} showTime {...props}/>;

DateTimeField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};


export default withStyles(styles)(DateTimeField);
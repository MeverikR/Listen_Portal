// Компонент для Телефончика

import React from 'react';
import PropTypes from 'prop-types';
//import { parsePhoneNumberFromString } from 'libphonenumber-js'


const styles = {
    phfield: {
        color: '#031225',
        fontSize: '13px',
        wordBreak: 'keep-all',
        whiteSpace: 'nowrap'
    }
};
const PhoneTextField = ({ source, record = {} }) => {
 //const phone = '+' + record[source];

//  try {
//      const phoneNumber = parsePhoneNumberFromString(phone, 'RU');
//
//  if (typeof(phoneNumber ) != 'undefined' && phoneNumber != null)
// {
//  if (source === 'contact_phone_number'){
//  return (
//      <span style={styles.phfield}><strong>{ phoneNumber.formatNational(record[source]) }</strong></span>
//         )
//  } else {
//      return (
//          <span style={styles.phfield}>{ phoneNumber.formatNational(record[source]) }</span>
//         )
//  }
//
// }else{
//      return (<span style={styles.phfield}>{record[source]}</span>)
//  }
//
//  } catch (e) {
//      console.log(e);
//  }
 if (source === 'contact_phone_number') {
     return (<span style={styles.phfield}><strong>{record[source]}</strong></span>)
    } else {
     return (<span style={styles.phfield}>{record[source]}</span>)
    }
};

PhoneTextField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};


export default PhoneTextField;
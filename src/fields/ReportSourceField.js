import React from 'react';
import PropTypes from 'prop-types';



function get_txt_str(src) {
    
    const SourceAvaliable = {
    'callapi': 'Call API: Базовый набор',
    'callapi_management_call': 'Call API: Управление вызовами',
    'callapi_informer_call': 'Call API: Информационный вызов',
    'callapi_scenario_call': 'Call API: Вызов сценария',
    'va': 'Звонок ВАТС',
    'call_tracking': 'Аналитика',
    'dynamic_call_tracking' : 'Динамический коллтрекинг',
    'callout': 'Callout',
    'callback': 'Callback',
    'faxout': 'Факс',
    'sip' : 'Исходящий с SIP',
    'consultant' : 'Консультант',
    'sitephone' : 'Сайтфон',
    'lead' : 'Лидогенератор',
    'retailcrm' : 'Звонок из retailCRM',
    'amocrm' : 'Звонок из amoCRM',
    'bitrix' : 'Звонок из Bitrix24'
}

    if (SourceAvaliable.hasOwnProperty(src)){
        return SourceAvaliable[src];

    }  else {
        return 'Неизвестный';
    }

}

const ReportSourceField = ({ source, record = {} }) =>
    <span>{get_txt_str(record[source])}</span>;

ReportSourceField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

    // допилим текстовое представление


export default ReportSourceField;
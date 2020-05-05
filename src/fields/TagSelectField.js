import PropTypes from "prop-types";
import React from 'react';
import Select from 'react-select'
import {httpClient} from './../httpClient';
import jsonServerProvider from 'ra-data-json-server';

import {CREATE} from 'react-admin';

const dataProvider = jsonServerProvider(process.env.REACT_APP_API_URL, httpClient);


const TagSelectField = ({source, record = {}}) => {

    const user = JSON.parse(localStorage.getItem('current_user'));
    const user_tags = user.params.tags || [];
    const tags_avaliable = user.client.tags_available || [];
    let row_tags = record.tags || [];

    if (row_tags){
        row_tags = row_tags.map((e) => e.tag_id);
    }


    let options = user_tags.map(function (elem) {

        let label_ = tags_avaliable.filter(e => e.id === elem ? e.name : null)[0].name;
            return {value: elem.toString(), label: label_}

    });

    if (typeof options !== 'undefined' && options !== null){
        options = options.filter((e) => {
            let val = parseInt(e.value);
            return !row_tags.includes(val);
    });

    }

    function putTag(id, tag_id, tag_name, provider, self) {
        let conf = window.confirm("Установить тег [" + tag_name + "] на обращение [" + id + "]?");

        if (conf) {
            dataProvider(CREATE, 'set_tag', {data: {communication_id: id, tag_id: tag_id}})
                .then(response => {

                    if (response.hasOwnProperty('data')) {
                        // релоадим отчет, ибо я хз как перерендерить строку
                        setTimeout(function () {
                            document.getElementsByTagName('button')[1].click();
                        }, 800)

                    }
                });
        }else {

            setTimeout(function () {
                            document.getElementsByTagName('button')[1].click();
                        }, 500)
        }

    }

    return (
        <Select 
            options={options} 
            className="tag-selecter-container" 
            id={'tgs_usr_' + record.id} 
            classNamePrefix="tag-selecter" 
            defaultValue={{label: "Проставить тег", value: 0}} 
            isSearchable={false} 
            onChange={(opt, e )=> {putTag(record.id, opt.value, opt.label, dataProvider, e)}}
        />
    )
};

TagSelectField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

// допилим текстовое представление


export default TagSelectField;
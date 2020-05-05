import React, {Component} from 'react';
import {ChipField} from 'react-admin';
import PropTypes from 'prop-types';


class TagChiepField extends Component {

    handleDelete = (a) => {
         let conf = window.confirm("Вы действительно хотите снять тег [" + a.tag_name + "] c обращения [" + a.comm_id + "]?");
         if (conf) {
             fetch( process.env.REACT_APP_API_URL + '/unset_tag', {
                 method: 'POST',
                 headers: {
                     'Authorization': 'Bearer ' + localStorage.getItem('token')
                 },
                 body: JSON.stringify(a)
             }).then(resp => {
                 if (resp.status === 200 && resp.ok) {
                     setTimeout(function () {
                         document.getElementsByTagName('button')[1].click();
                     }, 500)
                 }
             });
         }
    };

    render() {
        const user = JSON.parse(localStorage.getItem('current_user'));
        const allow_tags_delete = user['params']['allow_tags_delete'];
        return (<ChipField {...this.props} className={allow_tags_delete ? "tag_del_active" : "tag_del_not"}
                           onClick={
                               () => allow_tags_delete && this.handleDelete(this.props.record)
                           }/>);
    }
}

TagChiepField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

export default TagChiepField;
import {downloadCSV} from 'react-admin';
import {unparse as convertToCSV} from 'papaparse/papaparse.min';

export const exporterUsers = (users) => {
    let hereWillBeTheClientName = '';
    const usersForExport = users.map(user => {
        const client_name = user.client.name;
        const client_infopin = user.client.infopin;
        const client_app_id = user.client.app_id;
        const group_name = user.group.name;
        const {
            allow_tags_add, allow_tags_delete, hide_sys_aon, hide_sys_id,
            hide_sys_player, hide_sys_static, fields, tags, filters
        } = user.params;

        hereWillBeTheClientName = client_name;
        user.client_name = client_name;
        user.client_infopin = client_infopin;
        user.client_app_id  = client_app_id;
        user.group_name  = group_name;
        user.allow_tags_add  = allow_tags_add ? 'Да' : 'Нет';
        user.allow_tags_delete  = allow_tags_delete ? 'Да' : 'Нет';
        user.hide_sys_aon  = hide_sys_aon ? 'Да' : 'Нет';
        user.hide_sys_id  = hide_sys_id ? 'Да' : 'Нет';
        user.hide_sys_player  = hide_sys_player ? 'Да' : 'Нет';
        user.hide_sys_static  = hide_sys_static ? 'Да' : 'Нет';
        user.fields  = JSON.stringify(fields) ;
        user.tags  = JSON.stringify(tags);
        user.filters  = JSON.stringify(filters);

        return user;
    });


    const csv = convertToCSV({
        data: usersForExport,
        fields: ['id', 'name', 'login', 'password', 'email_address', 'group_id', 'group_name', 'client_id', 'client_name', 'client_infopin',
            'client_app_id', 'allow_tags_add', 'allow_tags_delete', 'hide_sys_aon',  'hide_sys_id', 'hide_sys_player', 'hide_sys_static',
            'fields', 'tags', 'filters'

        ] // order fields in the export
    });

    let __cs = csv.split("\n");
    __cs.shift();
    __cs.unshift('ID, ФИО, Логин, Пароль, E-mail, ID Группы, Группа, ID Клиента, Клиент, Инфопин клиента, APP ID, Может добавить тег, Может снять тег, Скрыть АОН, Скрыть ID, Скрыть плеер, Скрыть статистику , JSON поля, JSON теги, JSON фильтры');
    const _download = __cs.join("\n");
    //console.log(_download )
    downloadCSV(_download, 'Список_пользователей_(' + hereWillBeTheClientName + ')'); // download as 'posts.csv` file
};
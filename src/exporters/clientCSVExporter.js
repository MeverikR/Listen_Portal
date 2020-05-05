import {downloadCSV} from 'react-admin';
import {unparse as convertToCSV} from 'papaparse/papaparse.min';

export const exporterClients = (clients) => {
    const clientsForExport = clients.map(client => {

        const {name, login, password, comment, email_address} = client.main_user;
        const {count} = client.users;
        client.admin_name = name;
        client.admin_login = login;
        client.admin_password = password;
        client.admin_comment = comment;
        client.admin_email = email_address;
        client.users_count = count;

        return client;
    });


    const csv = convertToCSV({
        data: clientsForExport,
        fields: ['id', 'name', 'infopin', 'app_id', 'token', 'created_at', 'updated_at', 'admin_name', 'admin_login',
            'admin_password', 'admin_comment', 'admin_email', 'users_count'
        ] // order fields in the export
    });

    let __cs = csv.split("\n");
    __cs.shift();
    __cs.unshift('ID, Название, ID Инфопин, APP ID, Токен DataAPI, Создан, Изменен, Основной пользователь, Логин администратора, Пароль администратора, Комментарий, E-mail администратора, Количество пользователей');
    const _download = __cs.join("\n");
    //console.log(_download )
    downloadCSV(_download, 'Список_клиентов_слухачи'); // download as 'posts.csv` file
};
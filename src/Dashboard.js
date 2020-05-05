import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import {withStyles} from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import deepOrange from '@material-ui/core/colors/deepOrange';
import {Title, Query, Loading} from 'react-admin';


const styles = {
    avatar: {
        margin: 10,
    },
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepOrange[500],
    },

};


// покажет шапку
function fTextContent(g) {
    switch (parseInt(g)) {
        case 0:
            return 'Вы можете добавлять новые кабинеты клиентов. Не передавайте доступ суперадминистратора.';

        case 1:
            return 'Вы можете создавать новых пользователей с типом доступа "Речевой аналитик". Добавлять/удалять теги, фильтры, настраивать поля отчета.';

        case 2:
            return 'Вы можете прослушивать записи звонков и проставлять необходимые теги';
        default:
            return '';

    }
}


const MyDashBoard = (props) => {
    let user = JSON.parse(localStorage.getItem('current_user'));

    return (
        <div>
            <Card>
                <Title title={user.client.name + ": " + user.name}/>
                <CardHeader title={"Здравствуйте, " + user.name + "!"}/>
                <CardContent>
                    Ваша группа: {user.group.name} <br/>

                    Клиент: <b>{(user.client.name)}</b><br/>
                    {fTextContent(user.group_id)}
                </CardContent>
            </Card>
            <br/>
            <Card>
                <CardHeader title={"Стастистика"}/>
                <CardContent>
                    <Query type="GET_ONE" resource="dashboard" payload={{id: user.id}}>
                        {({data, loading, error}) => {
                            if (loading) {
                                return <Loading/>;
                            }
                            if (error) {
                                return <p>При загрузке данных произошла ошибка. Не удалось получить данные с сервера. Подробности в консоли. {console.log(error)}</p>;
                            }
                            switch (parseInt(user.group_id)) {
                                case 0:
                                    return (
                                         <Table style={{width: '50%'}}>
                                            <TableBody>
                                                <TableRow key={1}>

                                                    <TableCell>
                                                        Всего пользователей:
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {data.hasOwnProperty('all_users_count') ? data.all_users_count : 0}
                                                    </TableCell>

                                                </TableRow>
                                                <TableRow key={2}>
                                                    <TableCell>
                                                        Администраторов:
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {data.hasOwnProperty('all_admins_count') ? data.all_admins_count : 0}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={3}>
                                                    <TableCell>
                                                        Клиентов:
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {data.hasOwnProperty('all_clients_count') ? data.all_clients_count : 0}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={4}>
                                                    <TableCell>
                                                        Токенов роздано сегодня:
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {data.hasOwnProperty('logins') ? data.logins : 0}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={5}>
                                                    <TableCell>
                                                        Тегов проставлено сегодня:
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {data.hasOwnProperty('tags_seted') ? data.tags_seted : 0}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={6}>
                                                    <TableCell>
                                                        Тегов снято сегодня:
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {data.hasOwnProperty('tags_unseted') ? data.tags_unseted : 0}
                                                    </TableCell>
                                                </TableRow>


                                            </TableBody>
                                        </Table>
                                    );
                                case 1:
                                    return (
                                        <Table style={{width: '50%'}}>
                                            <TableBody>
                                                <TableRow key={1}>

                                                    <TableCell>
                                                        Всего пользователей:
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {data.hasOwnProperty('all_users_count') ? data.all_users_count : 0}
                                                    </TableCell>

                                                </TableRow>
                                                <TableRow key={2}>
                                                    <TableCell>
                                                        Слушателей:
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {data.hasOwnProperty('all_listeners') ? data.all_listeners : 0}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={3}>
                                                    <TableCell>
                                                        Всего прослушено звонков:
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {data.hasOwnProperty('tracks_listened_all') ? data.tracks_listened_all : 0}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={4}>
                                                    <TableCell>
                                                        Прослушено звонков за сегодня:
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {data.hasOwnProperty('tracks_listened_today') ? data.tracks_listened_today : 0}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={5}>
                                                    <TableCell>
                                                        Самый активный пользователь:
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {data.hasOwnProperty('best_user') ? data.best_user : 0}
                                                    </TableCell>
                                                </TableRow>


                                            </TableBody>
                                        </Table>
                                    );
                                case 2:
                                    return (
                                        <Table style={{width: '50%'}}>
                                            <TableBody>
                                                <TableRow key={1}>
                                                    <TableCell>
                                                        Звонков прослушено (всего):
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {data.hasOwnProperty('tracks_listened') ? data.tracks_listened : 0}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={2}>
                                                    <TableCell>
                                                        Звонков прослушено сегодня:
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {data.hasOwnProperty('tracks_listened_today') ? data.tracks_listened_today : 0}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={3}>
                                                    <TableCell>
                                                        Тегов проставлено (всего):
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {data.hasOwnProperty('tags_seted') ? data.tags_seted : 0}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={4}>
                                                    <TableCell>
                                                        Тегов проставлено сегодня:
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {data.hasOwnProperty('tags_seted_today') ? data.tags_seted_today : 0}
                                                    </TableCell>
                                                </TableRow>
                                                {user.params.allow_tags_delete ?
                                                    <TableRow key={5}>
                                                        <TableCell>
                                                            Тегов снято (всего):
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {data.hasOwnProperty('tags_unseted') ? data.tags_unseted : 0}
                                                        </TableCell>
                                                    </TableRow> : null
                                                }
                                                {user.params.allow_tags_delete ?
                                                    <TableRow key={6}>
                                                        <TableCell>
                                                            Тегов снято сегодня:
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {data.hasOwnProperty('tags_unseted_today') ? data.tags_unseted_today : 0}
                                                        </TableCell>
                                                    </TableRow> : null
                                                }
                                                <TableRow key={7}>
                                                    <TableCell>
                                                        Последнее прослушанное обращение (ID):
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {data.hasOwnProperty('tracks_listened_last') ? data.tracks_listened_last : ''}
                                                    </TableCell>
                                                </TableRow>

                                            </TableBody>
                                        </Table>
                                    );

                                default:
                                    return (
                                           <Table style={{width: '50%'}}>
                                            <TableBody>
                                                <TableRow key={1}>
                                                    <TableCell align="right">
                                                            Невозможно загрузить статистику. Попробуйте позднее.
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>

                                    );

                            }
                        }}
                    </Query>
                </CardContent>
            </Card>
        </div>
    )
};

export default withStyles(styles)(MyDashBoard);
import './App.css';
import React from 'react';
import {Admin, Resource } from 'react-admin';
import Dashboard from './Dashboard';
// аутентификация
import authProvider from './authProvider';
// авторизация по заголовку
import { httpClient } from './httpClient';
// грузим компонент юзеров
import {UserList} from "./users";
// грузим компонент клиентов
import {ClientList} from "./clients";
// грузим компонент отчетов
import ReportList from "./reports";
// грузим компонент тэгов
import {TagList} from "./tags";

/* Иконки и красотули */
import ReportIcon from '@material-ui/icons/Assessment';
import UserIcon from '@material-ui/icons/Group';
import ClientIcon from '@material-ui/icons/AssignmentInd';

/* враппер для плеера */
import AudioPlayer from './fields/AudioPlayer';

// всякие провайдеры для обработки данных
import jsonServerProvider from 'ra-data-json-server';
import russianMessages from 'ra-language-russian'
// форма входа
import CustomLoginPage from './loginPage.js'

// форма редактирования пользователя
import { UserEditForm } from './forms/UserEditForm';
import { UserAddForm } from './forms/UserAddForm';
import { ClientEditForm } from './forms/ClientEditForm';
import { ClientAddForm } from './forms/ClientAddForm';
import { TagAddForm } from './forms/TagAddForm';


const messages = {
    ru: russianMessages,
};

const i18nProvider = locale => messages[locale];


const api_url = process.env.REACT_APP_API_URL;
if (typeof(api_url ) == 'undefined' || api_url == null){
    alert('Система не сконфигурирована. Пожалуйста проверьте настройки развертывания.')
}


const dataProvider = jsonServerProvider(api_url, httpClient);


const App = () => {
    return <React.Fragment>
        <Admin locale="ru" i18nProvider={i18nProvider} dataProvider={dataProvider} authProvider={authProvider}
               loginPage={CustomLoginPage} dashboard={Dashboard}>
            {permissions => [
                    parseInt(permissions.group_id) === 0
                        ? <Resource name="clients" options={{label: 'Клиенты'}} list={ClientList} edit={ClientEditForm}
                      create={ClientAddForm} icon={ClientIcon}/>
                      : null,
                    parseInt(permissions.group_id) === 1 
                        ? <Resource name="users" options={{label: 'Пользователи'}} list={UserList} edit={UserEditForm}
                      create={UserAddForm} icon={UserIcon}/>
                      : null,
                    parseInt(permissions.group_id) === 2
                    ? <Resource name="reports" options={{label: 'Звонки'}} list={ReportList} icon={ReportIcon}/>
                    : null,
                    (permissions.params.allow_tags_add && (parseInt(permissions.group_id) === 1 ||  parseInt(permissions.group_id) === 2)  )
                    ? <Resource name="tags" options={{label: 'Теги'}} list={TagList} create={TagAddForm}/>
                    : null
            ]}

        </Admin>
        <AudioPlayer src=''/>
 <div style={{
    position: 'fixed', right: 0, bottom: 0, left: 0, zIndex: 0,
    padding: 6,
    backgroundColor: '#363636',
    textAlign: 'center',
    fontSize: '13px',
    color:'#fff',
    overflow: 'hidden'

  }}>
             Портал аудио-аналитики (v. 2.24.1b), &copy; CoMagic, "Проектные решения", 2019
         </div>

    </React.Fragment>
};

export default App;
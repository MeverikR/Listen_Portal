import {AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS} from 'react-admin';
import decodeJwt from 'jwt-decode';
import {showNotification} from 'react-admin';
import ReconnectingWebSocket from 'reconnecting-websocket';

export default (type, params) => {
    // called when the user attempts to log in
    if (type === AUTH_LOGIN) {
        const {username, password} = params;

        // делаем запрос на наш сервак, и уточняемся кто мы
        const request = new Request(process.env.REACT_APP_API_URL + '/login', {
            method: 'POST',
            body: btoa(unescape(encodeURIComponent(JSON.stringify({username, password})))),
            headers: new Headers({'Content-Type': 'application/json'}),
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }

                return response.json();
            })
            .then((json) => {
                // сервер возвращет нам после логина большое описание всех настроек пользака
                // сохраняем его в стораж
                if (!json.hasOwnProperty('token')) {
                    throw new Error('Невозможно выполнить авторизацию!');
                }

                if (!json.hasOwnProperty('user')) {
                    throw new Error('Невозможно выполнить авторизацию!');
                }


                const decodedToken = decodeJwt(json.token);

                if (parseInt(decodedToken.id) !== parseInt(json.user.id)) {
                    throw new Error('Невозможно выполнить авторизацию!');
                }

                localStorage.setItem('current_user', JSON.stringify(json.user));
                localStorage.setItem('token', JSON.stringify(json.token));


                try {

                    let ws = '';

                    if (process.env.REACT_APP_API_URL.includes('https')){
                    ws = new ReconnectingWebSocket('wss://' +
                        process.env.REACT_APP_API_URL.replace('http://', '')
                            .replace('https://', '') + '/ws');

                    }else {
                    ws = new ReconnectingWebSocket('ws://' +
                        process.env.REACT_APP_API_URL.replace('http://', '')
                            .replace('https://', '') + '/ws');

                    }



                    ws.onopen = function () {
                        console.log('WS connection started');
                            ws.send(JSON.stringify({
                                type: 'auth',
                                payload: json.token
                           }));
                    };

                    // обработка всех событий вебсокета
                    ws.onmessage = function (event) {
                        //console.log('WS event', event.data);
                        try {
                            const {type, payload} = JSON.parse(event.data);
                            let usr_profile = JSON.parse(localStorage.getItem('current_user'));
                            switch (type) {
                                case 'update_user_tag':
                                    if ( payload && (payload !== 'undefined') && (payload != null))
                                    {
                                        if (payload.hasOwnProperty('user_tags') && payload.hasOwnProperty('client_tags')){
                                        usr_profile.params.tags = payload.user_tags;
                                        usr_profile.client.tags_available = payload.client_tags;
                                        localStorage.setItem('current_user', JSON.stringify(usr_profile));
                                        //console.log('User tags updated!');
                                        } else {
                                            console.error('Cant update User tags. No data.');
                                        }

                                    } else {
                                        console.error('Cant update user tags', payload);
                                    }
                                    break;
                                case 'update_profile':

                                        //console.log('Server profile updated');
                                        localStorage.setItem('current_user', JSON.stringify(payload));
                                        showNotification('Ваш профиль был обновлен!');
                                    break;

                                case 'update_client_tags':
                                    usr_profile.client.tags_available = payload;
                                    localStorage.setItem('current_user', JSON.stringify(usr_profile));

                                    break;


                                default:
                                    console.log('WS-COMMAND-WE-DONT-UNDERSTAND: ' , type);


                            }

                        } catch (e) {
                            console.error('WS-EVENT-ERROR: ' + e.toString())
                        }

                    };

                    ws.onclose = function (event) {
                        if (event.wasClean) {
                            console.log('WS connection closed successfully')
                        } else {
                            console.log('WS connection broken')
                        }
                    };

                    ws.onerror = function (e) {
                        console.log('WS error:', e);
                    };



                } catch (e) {
                    console.log('Error connect to WS server', e);

                }

            });


    }
    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        // при выходе убиваем данные из стоража

        let _token = JSON.parse(localStorage.getItem('token'));

        const request = new Request(process.env.REACT_APP_API_URL + '/logout', {
            method: 'GET',
            // 'Authorization', `Bearer ${token}`
            headers: new Headers({'Authorization': `Bearer ${_token}`}),
        });
        fetch(request).then(() => {
            showNotification('Ваш сеанс завершен, спасибо!')
        });

        localStorage.removeItem('current_user');
        localStorage.removeItem('token');


        return Promise.resolve();
    }
    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const {status} = params;

        if (status === 401 || status === 403) {
            localStorage.removeItem('current_user');
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        return JSON.parse(localStorage.getItem('token'))
            ? Promise.resolve()
            : Promise.reject();
    }
    if (type === AUTH_GET_PERMISSIONS) {
        const user = JSON.parse(localStorage.getItem('current_user'));
        return user ? Promise.resolve(user) : Promise.reject();
    }
    return Promise.reject('Unknown method');
};
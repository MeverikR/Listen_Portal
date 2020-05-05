import React from 'react';
import { Login, LoginForm } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';


const styles = ({
    main: {
        background: 'rgba(188, 221, 178, 0.7)',
        backgroundImage: 'url(https://www.comagic.ru/local/templates/main/images/logo.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 35px'
    },
    avatar: {
        background: 'url(images/headphones.gif)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        height: 160,
        margin: 0,
        backgroundPosition: 'center'
    },
    icon: { display: 'none' },
});

// наследуем форму логина и переопределяем чутка
const CustomLoginForm = withStyles({
    button: {
        background: '#8dd03a'
    }
})(LoginForm);

// берем стандартную страницу логина
const CustomLoginPage = props => (
    <Login backgroundImage={'none'}
        loginForm={<CustomLoginForm />}
        {...props}
    />
);

export default withStyles(styles)(CustomLoginPage);
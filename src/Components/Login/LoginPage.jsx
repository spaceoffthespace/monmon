import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import './LoginPage.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'; // import Link from react-router-dom
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import i18n from 'i18next'; // Import i18n if it's not already imported

const LoginPage = () => {
    const { loginUser } = useContext(AuthContext);
    const [captchaKey, setCaptchaKey] = useState('');
    const [captchaImage, setCaptchaImage] = useState('');
    const [captchaResponse, setCaptchaResponse] = useState('');
    const { t } = useTranslation(); // Initialize the translation hook


    const Url = process.env.REACT_APP_API_URL;
    const CAPTCHAurl = process.env.REACT_APP_API_CAPTCHA_URL;

    useEffect(() => {
        axios.get(`${CAPTCHAurl}/api/get-captcha/`)
            .then(response => {
                const data = response.data;
                setCaptchaKey(data.captcha_key);
                setCaptchaImage(`${CAPTCHAurl}${data.captcha_image}`);
            })
            .catch(error => {
                console.error("Error fetching captcha:", error);
            });
    }, []);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            username: e.target.username.value,
            password: e.target.password.value,
            captcha_key: captchaKey,
            captcha_response: captchaResponse
        };

        try {
            const ipResponse = await axios.get('https://ipinfo.io/ip');
            const clientIP = ipResponse.data;

            payload.login_ip = clientIP;

            loginUser(payload);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const [language, setLanguage] = useState(() => {
        // Restore the language option from local storage if present, otherwise default to 'en'
        return localStorage.getItem('language') || 'en';
    });
    
    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    useEffect(() => {
        i18n.changeLanguage(language);
        localStorage.setItem('language', language);
    }, [language]);

    return (
        <div className="login-container">

<div className="language-container">
                <select value={language} onChange={handleLanguageChange}>
                <option value="en">English</option> 
                <option value="ar">العربية</option> 
              <option value="fr">Français</option>
              <option value="gr">Deutsch</option> 
                </select>
            </div>
            <form onSubmit={handleLoginSubmit} className="login-form">
                <h2 className="login-title"> {t('login.Pagetitle')}</h2>

                <TextField 
                    label={t('login.phoneNumber')}
                    variant="filled"
                    name="username"
                    className="login-input"
                />

                <TextField 
                    label={t('login.Password')}
                    type="password"
                    variant="filled"
                    name="password"
                    className="login-input"
                />

                <div className="captcha-container">
                    <img src={captchaImage} alt="CAPTCHA" className="captcha-image" />
                    <TextField 
                        label="Enter CAPTCHA"
                        variant="outlined"
                        value={captchaResponse}
                        onChange={e => setCaptchaResponse(e.target.value)}
                        className="login-input captcha-input"
                    />
                </div>

                <Button variant="contained" type="submit" className="login-submit">{t('login.Pagetitle')}</Button>
                <Button variant="outlined" className="register-button" component={Link} to="/register">
                {t('login.Register')}</Button>
            </form>
        </div>
    )
}

export default LoginPage;

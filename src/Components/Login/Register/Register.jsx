import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Register.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import frontfront from '../../../Components/assets/email-4044165_640.jpg'
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoadLoader from '../../Loader/ClipsLoader'; // Ensure you import your loader component correctly
import PhoneInput from 'react-phone-number-input';
import InputAdornment from '@mui/material/InputAdornment';
import { geolocated } from 'react-geolocated';
import { getCountryCallingCode } from 'libphonenumber-js';

import 'react-phone-number-input/style.css';
import { Phone } from '@mui/icons-material';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import i18n from 'i18next'; // Import i18n if it's not already imported
const RegistrationPage = () => {
  const navigate = useNavigate();
  const { ref_code } = useParams();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [clientIP, setClientIP] = useState('');
  const [country, setCountry] = useState('');
  const [countryIP, setCountryIP] = useState('');

  const [defaultCountry, setDefaultCountry] = useState(() => {
    const storedDefaultCountry = localStorage.getItem('defaultCountry');
    return storedDefaultCountry || ''; // Set the default value here
  });
  const [phoneNumber, setPhoneNumber] = useState('');

  const [phoneValue, setPhoneValue] = useState('');

  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('');



  const [captchaKey, setCaptchaKey] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');
  const [captchaResponse, setCaptchaResponse] = useState('');
  const { t } = useTranslation(); // Initialize the translation hook

  const CAPTCHAurl = process.env.REACT_APP_API_CAPTCHA_URL;
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchIPAndCountry = async () => {
    try {
      // Check if country and defaultCountry are already in localStorage
      const storedCountry = localStorage.getItem('country');
      const storedDefaultCountry = localStorage.getItem('defaultCountry');

      if (storedCountry && storedDefaultCountry) {
        setCountry(storedCountry);
        setDefaultCountry(storedDefaultCountry);
      } else {
        // Fetch country and defaultCountry
        const response = await fetch('http://ip-api.com/json');
        const data = await response.json();
        setClientIP(data.ip);
        setCountry(data.countryCode);
        setDefaultCountry(data.countryCode);
        setCountryIP(data.countryCode); // Set countryIP for backend

        localStorage.setItem('country', data.countryCode); // Store in localStorage
        localStorage.setItem('defaultCountry', data.countryCode); // Store in localStorage
        console.log(data.ip)
      }
    } catch (error) {
      console.error("Error fetching IP and country:", error);
      try {
        // If "ip-api.com" fails, fall back to using "ipinfo.io"
        const ipInfoResponse = await axios.get('https://ipinfo.io/json');
        const ipInfoData = ipInfoResponse.data;
        setCountry(ipInfoData.country);
        setDefaultCountry(ipInfoData.country);
        localStorage.setItem('country', ipInfoData.country); // Store in localStorage
        localStorage.setItem('defaultCountry', ipInfoData.country); // Store in localStorage
        console.log(ipInfoData.country);
      } catch (error) {
        console.error('Error fetching user country from "ipinfo.io":', error);
      }
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    setReferralCode(ref_code || '');
    fetchIPAndCountry();
    axios.get(`${CAPTCHAurl}/api/get-captcha/`)
      .then(response => {
        const data = response.data;
        setCaptchaKey(data.captcha_key);
        setCaptchaImage(`${CAPTCHAurl}${data.captcha_image}`);
      })
      .catch(error => {
        console.error("Error fetching captcha:", error);
      });

    // Ensure the phone number has the country calling code prefixed
    if (country && !username.startsWith('+')) {
        const fullPhoneNumber = getFullPhoneNumber(username, country);
        setUsername(fullPhoneNumber);
    }

}, [ref_code, country]);

  function getFullPhoneNumber(phoneNumber, countryCode) {
    if (phoneNumber.startsWith('+')) {
        return phoneNumber;
    }
    const callingCode = getCountryCallingCode(countryCode);
    return `+${callingCode}${phoneNumber}`;
}




  const handleRegister = async (e) => {
    e.preventDefault();

    setFieldErrors({});

    let errors = {};

    if (!username.trim()) errors.username =  [t('register.blank')];
    if (!email.trim()) errors.email =  [t('register.blank')];
    if (!firstName.trim()) errors.first_name =  [t('register.blank')];
    if (!lastName.trim()) errors.last_name =  [t('register.blank')];

    const phoneRegex = /^\+?[1-9]\d{1,14}$/; 
    if (!phoneRegex.test(username)) {
        errors.username = [t('register.invalidPhoneNumber')];
    }

    // Validate that password is filled out
    if (!password.trim()) errors.password =  [t('register.blank')];

    // Validate that referral code is filled out
    if (!referralCode.trim()) errors.ref_code =  [t('register.blank')];

    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      setOpenSnackbar(true);
      setErrorMessage(t('register.pass'));
      return;
    }

    try {
      const ipResponse = await fetch('https://ipinfo.io/ip');
      const clientIP = await ipResponse.text();

      const userData = {
        username,
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        ref_code: referralCode,
        register_ip: clientIP,
        country_ip: defaultCountry, // Include country_ip in the payload
        captcha_key: captchaKey,
        captcha_response: captchaResponse
      };

      
      const response = await axios.post(`${apiUrl}/register/`, userData);
      navigate('/login', { state: { username } });
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.detail) {
              setOpenSnackbar(true);
              
              const translationKey = mapErrorToTranslationKey(error.response.data.detail);
              const translatedErrorMessage = t(`register.${translationKey}`);
              setErrorMessage(translatedErrorMessage);
          } else {
            // Handle other types of errors
              setFieldErrors(error.response.data);
            }
      } else {
        setOpenSnackbar(true);
          setErrorMessage(t('register.errors.genericError'));
      }
      console.error(error);
  }
};
function mapErrorToTranslationKey(errorMessage) {
  const errorMapping = {
      "Invalid phone number provided!": "invalidPhoneNumber",
      "Invalid email address provided!": "invalidEmail",
      "Invalid referral code provided!": "invalidCode",
      "Referral code is required!": "requiredReferralCode"
      // Add more mappings as needed
  };

  return errorMapping[errorMessage] || "genericError"; // Fallback to a generic error key if the specific error message is not mapped
}

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


const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) {
    return <LoadLoader />; // Show loading spinner while fetching IP and country
  }

  return (
    <div className="register-container" >
      <div>
      <div className="language-container">
                <select value={language} onChange={handleLanguageChange}>
                <option value="en">English</option> 
                <option value="ar">العربية</option> 
              <option value="fr">Français</option>
              <option value="gr">Deutsch</option> 
                </select>
            </div>
      </div>
      
      <Typography variant="h4" gutterBottom>
      {t('register.text1')}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
      {t('register.text2')}
      </Typography>
      <form onSubmit={handleRegister}>
      <TextField
        type="tel"
        label={t('register.phoneNumber')}
        variant="filled"
        value={username}
        onChange={(e) => {
          const sanitizedValue = e.target.value.replace(/[^0-9+]/g, '');
          setUsername(sanitizedValue);
      }}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneInput
    displayInitialValueAsLocalNumber
    international
    countryCallingCodeEditable={false}
    value={username}
    onChange={value => setUsername(getFullPhoneNumber(value, country))}
    defaultCountry={defaultCountry}
    country={defaultCountry}
    style={{ width: 'auto' }}
/>
            </InputAdornment>
          ),
        }}
      />
        <TextField
          type="email"
          label={t('register.email')}
          variant="filled"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!fieldErrors.email}
          helperText={fieldErrors.email ? fieldErrors.email[0] : ""}
        />
        <TextField
          type="text"
          label={t('register.first')}
          variant="filled"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={!!fieldErrors.first_name}
          helperText={fieldErrors.first_name ? fieldErrors.first_name[0] : ""}
        />
        <TextField
          type="text"
          label={t('register.Last')}
          variant="filled"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={!!fieldErrors.last_name}
          helperText={fieldErrors.last_name ? fieldErrors.last_name[0] : ""}
        />
        <TextField
          type="password"
          label={t('register.Password')}
          variant="filled"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!fieldErrors.password}
          helperText={fieldErrors.password ? fieldErrors.password[0] : ""}
        />
         <TextField
          type="password"
          label={t('register.confirm')}
          variant="filled"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!passwordMatch}
          helperText={passwordMatch ? "" : "Passwords do not match!"}

        />
        <TextField
          type="text"
          label={t('register.refferer')}
          variant="filled"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          error={!!fieldErrors.ref_code}
          helperText={fieldErrors.ref_code ? fieldErrors.ref_code[0] : ""}
        />
       <div className="captcha-register-container">
        <img src={captchaImage} alt="CAPTCHA" className="captcha-image" />
        <TextField 
            label="Enter CAPTCHA"
            variant="filled"
            value={captchaResponse}
            onChange={e => setCaptchaResponse(e.target.value)}
            className="register-input captcha-input"
        />
      </div>
        <Button variant="contained" type="submit">
        {t('register.Pagetitle')}
        </Button>
        
      </form>
      <Snackbar 
    open={openSnackbar} 
    autoHideDuration={6000} 
    onClose={handleCloseSnackbar}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // to position it at the bottom center
    style={{ 
        left: '50%', 
        transform: 'translateX(-50%)', 
        width: '100%', 
        maxWidth: 'none'
    }}  // these styles center it and make it full width
>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegistrationPage;

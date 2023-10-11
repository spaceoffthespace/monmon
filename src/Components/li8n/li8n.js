import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './li8/en.json';
import ar from './li8/ar.json';
import fr from './li8/fr.json';
import gr from './li8/gr.json';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: en,
            },
            ar: {
                translation: ar,
            },
            fr: {
                translation: fr,
            },
            gr: {
                translation: gr,
            },
        },
        lng: 'en', // if you're using a language detector, remove this line
        fallbackLng: 'en', // use en if detected lng is not available

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;

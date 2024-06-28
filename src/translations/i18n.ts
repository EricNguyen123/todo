import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import todoEN from '../translations/en/todo.json';
import authEN from '../translations/en/auth.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
      todo: todoEN,
      auth: authEN,
    },
} as const;

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option
    });

export default i18n;
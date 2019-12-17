import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
    en: {
        translation: {
            "header": "We offer",
            "ownersTitle": "Service stations owners",
            "ownersDesc": "Owners of service stations can add their facility to our database.",
            "driversTitle": "Support service for drivers",
            "driversDesc": "Drivers can get information about nearest available stations for service.",
            "roadsTitle": "Traffic jams and road state",
            "roadsDesc": "Get actual information about traffic jams on roads and statistics.",
            "checkOut": "Check out",
            "home": "Home",
            "owner": "Owner",
            "driver": "Driver",
            "switchLanguage": "Switch Language",
            "jam": "Traffic jam",
            "serviceStation": "Service station",
            "carWash": "Car wash",
            "serviceType": "Service Types",
            "getLoc": "Getting your current location...",
            "geoError": "Geolocation is not supported by this browser.",
            "submit": "Submit",
            "serviceTypeHeader": "Service type",
            "tableName": "Name",
            "tableDesc": "Description",
            "tableCoords": "Location",
            "loginHeader": "Authorization",
            "emailHeader": "Email address",
            "passwordHeader": "Password",
            "emailPlaceholder": "Enter email",
            "emailDesc": "We'll never share your email with anyone else.",
            "loginButton": "Log in",
            "signupButton": "Sign up",
            "facilityHeader": "Add your facility",
            "serviceName": "Service name:",
            "serviceNamePlaceholder": "Enter name",
            "serviceDesc": "Service description:",
            "serviceDescPlaceholder": "Enter description",
            "serviceLat": "Service latitude:",
            "serviceLon": "Service longitude:",
            "serviceTypeDrop": "Service Type",
            "searchHeader": "Search for facility",
            "tableLoc": "Location",
            "roadsH": "Traffic jam statistics",
            "graphYDesc": "Amount of cars on road",
            "graphXDesc": "Time",
            "roadsHeader": "Roads",
            "tableAddress": "Address",
            "tableSpeed": "Max allowed speed",
            "tableLines": "Amount of lines",
            "tableLength": "Length (km)",
            "tableBandwidth": "Bandwidth (per hour)",
            "tableState": "State",
            "jamState": "Jam",
            "empty": "Available",
            "service": "Service",
            "mapsLink": "Show in Google Maps"
        }
    },
    ua: {
        translation: {
            "header": "Ми пропонуємо",
            "ownersTitle": "Власникам станцій обслуговування",
            "ownersDesc": "Власники станцій обслуговування можуть додати їх установу.",
            "driversTitle": "Система підтримки водіїв",
            "driversDesc": "Водії можуть отримати інформацію про найближчі вільні точки.",
            "roadsTitle": "Затори та поточний стан доріг",
            "roadsDesc": "Отримуйте актуальну інформацію про завантаженність доріг.",
            "checkOut": "Детальніше",
            "home": "Головна",
            "owner": "Власникам",
            "driver": "Водіям",
            "switchLanguage": "Змінити Мову",
            "jam": "Затор",
            "serviceStation": "Станція обслуговування",
            "carWash": "Автомийка",
            "serviceType": "Тип Сервісу",
            "getLoc": "Отримання Ваших поточних координат...",
            "geoError": "Геолокація недоступна в цьому браузері.",
            "submit": "Підтвердити",
            "serviceTypeHeader": "Тип сервісу",
            "tableName": "Ім'я",
            "tableDesc": "Опис",
            "tableCoords": "Місцезнаходження",
            "loginHeader": "Авторизація",
            "emailHeader": "Електронна пошта",
            "passwordHeader": "Пароль",
            "emailPlaceholder": "Введіть поштову адресу",
            "emailDesc": "Ці дані не будуть доступні жодному з користувачів.",
            "loginButton": "Увійти",
            "signupButton": "Зареєструватись",
            "facilityHeader": "Додати установу",
            "serviceName": "Ім'я установи:",
            "serviceNamePlaceholder": "Введіть ім'я",
            "serviceDesc": "Опис установи:",
            "serviceDescPlaceholder": "Введіть опис",
            "serviceLat": "Координата широти:",
            "serviceLon": "Координата довготи:",
            "serviceTypeDrop": "Тип Сервісу",
            "searchHeader": "Пошук установи",
            "tableLoc": "Місцезнаходження",
            "roadsH": "Статистика заторів",
            "graphYDesc": "Кількість авто",
            "graphXDesc": "Час",
            "roadsHeader": "Дороги",
            "tableAddress": "Адресса",
            "tableSpeed": "Максимальна швидкість",
            "tableLines": "Кількість полос",
            "tableLength": "Довжина (км)",
            "tableBandwidth": "Пропускна здатність (за годину)",
            "tableState": "Стан",
            "jamState": "Затор",
            "empty": "Вільно",
            "service": "Сервіс",
            "mapsLink": "Показати на карті"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: (localStorage.getItem("currentLanguage") !== null && localStorage.getItem("currentLanguage") !== 'null')
            ? localStorage.getItem("currentLanguage") : 'en',

        keySeparator: false,

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
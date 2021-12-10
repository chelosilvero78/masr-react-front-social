import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
//-------multilenguaje----
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'



i18next
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['es','br', 'en', 'ar', 'fr'],
        fallbackLng: 'es',
        debug: false,
        // Options for language detector
        detection: {
            order: ['path', 'cookie', 'htmlTag'],
            caches: ['cookie'],
        },
        // react: { useSuspense: false },
        backend: {
            loadPath: 'assets/locales/{{lng}}/translation.json',
        },
    })

const loadingMarkup = (
    <div className="py-4 text-center">
        <h3>Loading..</h3>
    </div>
)

ReactDOM.render(
    <Suspense fallback={loadingMarkup}>
        <App />
    </Suspense>, 
    document.getElementById("root")
);
import React, { useEffect } from 'react'
import 'bootstrap/dist/js/bootstrap.js'
//import 'bootstrap/dist/css/bootstrap.min.css'
import 'flag-icon-css/css/flag-icon.min.css'

import GlobeIcon from './GlobeIcon'
//Multilenguaje--------------------
import { useTranslation } from 'react-i18next';
import i18next from 'i18next'
import { languages } from '../index'  //array de lenguajes

export default function LenguageSelect() {
  
  //establecer lenguaje predeterminado
  // const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguageCode = localStorage.getItem('i18next') || 'es';
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  const { t } = useTranslation()
  
  console.log("languages-->",languages)

  useEffect(() => {
    console.log('Setting page stuff')
    document.body.dir = currentLanguage.dir || 'ltr'
    document.title = t('app_title')
  }, [currentLanguage, t])

  return (
    <div className="dropdown">
      <button
        className="btn btn-link dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <GlobeIcon />
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {/* <li>
          <span className="dropdown-item-text">{t('language')}</span>
        </li> */}
        {languages.map(({ code, name, country_code }) => (
          <li key={country_code}>
            <a
              className={`dropdown-item ${currentLanguageCode === code ? 'disabled' : ''}`}
              onClick={() => { i18next.changeLanguage(code) }}
            >
              <span
                className={`flag-icon flag-icon-${country_code} mx-2`}
                style={{ opacity: currentLanguageCode === code ? 0.5 : 1, }}
              ></span>
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
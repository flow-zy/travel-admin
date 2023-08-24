import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import zh from '@/language/zh.json'
import en from '@/language/en.json'

const resources = {
	zh: {
		translation: zh
	},
	en: {
		translation: en
	}
}

// @ts-expect-error
void i18n.use(initReactI18next).init({
	resources,
	lngs: 'en',
	interpolation: {
		escapeValue: false
	}
})

export default i18n

import { useState, useEffect } from 'react'
import type { FC } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import zh_CN from 'antd/locale/zh_CN'
import en_US from 'antd/locale/en_US'
import i18n from 'i18next'

import 'moment/dist/locale/zh-cn'
import routes from './router'

import { type RootState } from '@/store'
import { getBrowserLang } from '@/utils'
import { setLanguage } from '@/store/slice/setting'

const App: FC = () => {
	const { language, theme, componentSize } = useSelector(
		(state: RootState) => state.setting
	)
	const dispatch = useDispatch()
	const [i18nLocale, setI18nLocale] = useState(zh_CN)
	// 设置 antd 语言国际化
	const setAntdLanguage = () => {
		// 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
		if (language && language === 'zh') return setI18nLocale(zh_CN)
		if (language && language === 'en') return setI18nLocale(en_US)
		if (getBrowserLang() === 'zh') return setI18nLocale(zh_CN)
		if (getBrowserLang() === 'en') return setI18nLocale(en_US)
	}
	useEffect(() => {
		// 全局使用国际化
		void i18n.changeLanguage(language || getBrowserLang())
		dispatch(setLanguage(language || getBrowserLang()))
		setAntdLanguage()
	}, [language])
	return (
		<div className="app">
			<ConfigProvider
				theme={theme}
				componentSize={componentSize}
				locale={i18nLocale}
			>
				<RouterProvider router={createHashRouter(routes)}></RouterProvider>
			</ConfigProvider>
		</div>
	)
}

export default App

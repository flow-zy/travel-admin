import * as XLSX from 'xlsx'

interface Query {
	pagesize: number
	pagenum: number
}
// 分页数据
export const pageData = (data: any[], query: Query): any[] => {
	return data.filter(
		(_, i) =>
			i >= (query.pagenum - 1) * query.pagesize &&
			i < query.pagesize * query.pagenum
	)
}

// 随机数
export const random = (min: number = 1, max: number = 100): number => {
	return Math.floor(Math.random() * (max - min) + 1)
}
// 下载文件
export const download = (blob: Blob) => {
	const url = URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = url
	a.download = 'filename.[hash-8].ext'
	a.click()
	URL.revokeObjectURL(url)
}
// 解析excel
export const uploadExcel = (file: File): any => {
	const render = new FileReader()
	let json = []
	render.onload = e => {
		const data = new Uint8Array(e.target?.result as ArrayBuffer)
		const workbook = XLSX.read(data, { type: 'array' })
		const sheetName = workbook.SheetNames[0] // 读取第一个sheet
		const worksheet = workbook.SheetNames[sheetName]
		json = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
	}
	render.readAsArrayBuffer(file)
	return json
}

// 导出
export const exportExcel = (jsonData: any) => {
	const worksheet = XLSX.utils.json_to_sheet(jsonData)
	const workbook = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
	XLSX.writeFile(workbook, 'data.xlsx')
}

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export const getBrowserLang = (): string => {
	const browserLang = navigator.language
	let defaultBrowserLang = ''
	if (
		browserLang.toLowerCase() === 'cn' ||
		browserLang.toLowerCase() === 'zh' ||
		browserLang.toLowerCase() === 'zh-cn'
	) {
		defaultBrowserLang = 'zh'
	} else {
		defaultBrowserLang = 'en'
	}
	return defaultBrowserLang
}

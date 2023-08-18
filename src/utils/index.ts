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

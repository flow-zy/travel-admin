import { type FC, useMemo, Fragment } from 'react'
import { useRouteError, useOutlet, Navigate } from 'react-router-dom'

const ErrorBoundary: FC = () => {
	const error = useRouteError()
	const outlet = useOutlet()
	const page = useMemo(() => {
		if (error) {
			return <Navigate to="/404"></Navigate>
		}
		return outlet
	}, [outlet, error])
	return <Fragment>{page}</Fragment>
}
export default ErrorBoundary

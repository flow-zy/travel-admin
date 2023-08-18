import { useMemo, useEffect, type FC, type ReactNode, Fragment } from 'react'
import { Navigate, useMatches } from 'react-router-dom'
import { getToken } from '@/utils/token'
import { v4 as uuidv4} from 'uuid'
interface Props {
  children:ReactNode
}
const AuthRoute:FC<Props> = ({children}:Props) => {
  const matches = useMatches()
  const page = useMemo(() => {
    if (getToken().length > 0) {return children}
    return <Navigate to={`/login?redirect=${uuidv4()}`} replace/>
  }, [getToken(), matches])
  useEffect(() => {
    const title = (matches[1].handle as any)?.title
    const isHasTitle = typeof title === 'string'
    if (isHasTitle) {
      document.title = title
    }
  }, [matches])
  return <Fragment>{ page}</Fragment>
}
export default AuthRoute

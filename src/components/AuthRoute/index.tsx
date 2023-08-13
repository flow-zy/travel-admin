import { useMemo, useEffect, type FC } from 'react'
import { Navigate, useMatches, useOutlet } from 'react-router-dom'
import { getToken } from '@/utils/token'
import { v4 as uuidv4} from 'uuid'
const AuthRoute:FC = () => {
  const outLet = useOutlet()
  const matches = useMatches()
  const page = useMemo(() => {
    if (getToken().length > 0) {return outLet}
    return <Navigate to={`/login?redirect=${uuidv4()}`} replace/>
  }, [getToken(), outLet, matches])
  useEffect(() => {
    const title = (matches[1].handle as any)?.title
    const isHasTitle = typeof title === 'string'
    if (isHasTitle) {
      document.title = title
    }
  }, [matches])
  return page
}
export default AuthRoute

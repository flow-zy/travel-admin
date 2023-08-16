import { type FC } from 'react'
import { Link } from 'react-router-dom'
interface propsType {
  isCollapse: boolean;
}

const Logo: FC<propsType> = (props) => {
  const { isCollapse } = props

  return (
    <Link to={{ pathname: '/' }}>
      <div className="logo-box flex justify-between items-center" style={{ height: '64px', lineHeight: 1, fontSize: '20px' }}>
        {!isCollapse && <h2 className="logo-text font-bold text-white ">React-Admin</h2>}
      </div>
    </Link>
  )
}

export default Logo


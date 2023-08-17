import { type FC, useState, useEffect } from 'react'
import { Tabs, type TabsProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { type MenuItem } from '@/layout'
type TargetKey = React.MouseEvent | React.KeyboardEvent | string
interface Props {
  tags: MenuItem[]
}
const TagView: FC<Props> = ({ tags }: Props) => {
  const { pathname } = useLocation()
  const [activeKey, setActive] = useState<string>('/home')
  const [items, setItems] = useState<TabsProps['items']>([])
  const navigate = useNavigate()
  useEffect(() => {
    const newItems: TabsProps['items'] = tags && tags.map((tag: any) => ({
      key: tag && tag.key,
      label: (
        <span>
          <i className={tag && tag.icon} style={{ marginRight: '5px' }}></i>
          {tag && tag.label}
        </span>
      ),
      closable: tag?.key!=='/home'
    }))
    setItems(newItems)
  }, [tags])
  useEffect(() => {
    setActive(pathname)
  }, [pathname])
  const changeRoute = (activeKey: string) => {
    navigate(activeKey)
  }
  const remove=(targetKey:TargetKey)=>{
   let newActiveKey = activeKey
    let lastIndex = -1
   items && items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const newPanes = items && items.filter((item) => item.key !== targetKey)
    if (newPanes && newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key
        navigate(newActiveKey)
      } else {
        newActiveKey = newPanes[0].key
        navigate(newActiveKey)
      }
    }
    setItems(newPanes)
  }
  const onEdit=(  targetKey: React.MouseEvent | React.KeyboardEvent | string)=>{
      remove(targetKey)
  }
  return (<Tabs 
    className='p-2 bg-white'
    defaultActiveKey={'/home'}
    items={items}
    onChange={changeRoute}
    activeKey={activeKey}
    type="editable-card"
    hideAdd
    onEdit={onEdit}
    size='small'
  ></Tabs>)
}

export default TagView

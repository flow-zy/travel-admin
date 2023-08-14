import { type FC ,useState,useEffect} from 'react'
import {Tabs ,type TabsProps} from 'antd'
import {useLocation,useNavigate} from 'react-router-dom'
import { type MenuItem} from '../../index'
interface Props {
  tags:MenuItem[]
}
const TagView:FC<Props>=({tags}:Props)=>{
  const {pathname}=useLocation()
  const [activeKey,setActive]=useState<string>('/home')
  const [items,setItems]=useState<TabsProps['items']>([])
  const navigate=useNavigate()
  useEffect(()=>{
    const newItems:TabsProps['items']=tags && tags.map((tag:any)=>({
      key:tag &&tag.key,
      label:(
        <span>
          <i className={tag &&tag.icon} style={{marginRight:'5px'}}></i>
          {tag &&tag.label}
        </span>
      )
    }))
    setItems(newItems)
  },[tags])
  useEffect(()=>{
    setActive(pathname)
  },[pathname])
  const changeRoute=(activeKey:string)=>{
    navigate(activeKey)
  }

  return (<Tabs className='pl-2 pr-2 bg-white'
   defaultActiveKey={'/home'}
    items={items} onChange={changeRoute} activeKey={activeKey}
  ></Tabs>)
}

export default TagView

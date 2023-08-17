import {type FC ,useEffect,useState} from "react"
import {userAll } from '@/api'
import type { IUser,IData } from '@/types'
import {message} from 'antd'
interface Query {
  pagesize:number | string
  pagenum:number |string
}
const List:FC=()=> {
  const [messageApi,contextHolder]=message.useMessage()
  const [userList,setUserList]=useState<IUser[]>([])
  const [query]=useState<Query>({pagenum:1,pagesize:10})
  const [total,setTotal]=useState<number>(0)
  const getUserList=async()=>{
const {data,code,message}= await userAll<IData>({
      method:'get',
      url:'/users/all',
      data:query
    })
    void messageApi.open({
      type:code===200 ?'success': 'error',
      content:message,
      onClose(){
        if(data!==null && data){
          setUserList(data?.list)          
          setTotal(data?.total)
        }
      }
    })
  }
  useEffect(()=>{
    void getUserList()
    console.log(userList,total)
  },[])
  return (
    <div>
      {contextHolder}
    </div>
  )
}

export default List

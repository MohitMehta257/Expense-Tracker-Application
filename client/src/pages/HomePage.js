import React,{useState,useEffect} from 'react'
import Layout from './../components/Layout/Layout'
import {Form, Input, message, Modal, Select, Table,DatePicker} from 'antd';  
import axios from 'axios';
import Spinner from './../components/Spinner';

import moment from 'moment';
const {RangePicker}=DatePicker;

function HomePage() {
  const[showModal,setShowModal]=useState(false);
  const[loading,setLoading]=useState(false);
  const[allTransaction,setAllTransaction]=useState([]);
  const[frequency,setFrequency]=useState('7');
  const[selectedDate,setSelectedDate]=useState([]);
  const[type,setType]=useState('all');


  // table data

  const columns=[ 
    {
      title:'Date',
      dataIndex:'date',
      render:(text)=> <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title:'Amount',
      dataIndex:'amount'
    },
    {
      title:'Type',
      dataIndex:'type'
    },
    {
      title:'Category',
      dataIndex:'cateogory'
    },
    {
      title:'refrence',
      dataIndex:'refrence'
    },

    {
      title:'Actions',
      dataIndex:'refrence'
    }
  ]

  const getAllTransactions=async()=>{
    try{
      const user=JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      const res=await axios.post('/transactions/get-transaction',{userid:user._id,frequency,selectedDate,type});
      setLoading(false)
      setAllTransaction(res.data)
      console.log(res.data)
    }catch(error){
      console.log(error)
      message.error("Fetch Issue With Transaction");
    }
  };

  useEffect(()=>{
    getAllTransactions();
  },[frequency,selectedDate,type]);




  const handleSubmit=async(values)=>{
      try{
        const user=JSON.parse(localStorage.getItem('user'))
        setLoading(true)
        await axios.post('/transactions/add-transaction',{...values,userid:user._id})
        message.success("Transaction Added Successfully")
        setShowModal(false)
      }catch(error){
        message.error("failed to add transaction");
        setLoading(false)
      }
  };

  return (
    <Layout>
      {loading && <Spinner/>}
        <div className='filters'>
            <div>
              <Select value={frequency} onChange={(values)=>{setFrequency(values)}}>
              <h6>Select frequency</h6>
                <Select.Option value="7">LAST 1 Week</Select.Option>
                <Select.Option value="30">LAST 1 Month</Select.Option>
                <Select.Option value="365">LAST 1 year</Select.Option>
                <Select.Option value="custom">Custom</Select.Option> 
              </Select>

              {frequency==='custom' && <RangePicker value={selectedDate} onChange={(values)=>setSelectedDate(values)}/>}
            </div>

            <div>
              <Select value={frequency} onChange={(values)=>{setType(values)}}>
              <h6>Select Type</h6>
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>

              {frequency==='custom' && <RangePicker value={selectedDate} onChange={(values)=>setSelectedDate(values)}/>}
            </div>
            <div>
              <button className='btn btn-primary' onClick={()=>setShowModal(true)}>
                Add New
              </button>

            </div>
        </div>

        <div className='content'>
          <Table columns={columns} dataSource={allTransaction} />
        </div>

        <Modal title="Add Transaction" open={showModal} onCancel={()=>setShowModal(false)} footer={false}>
          <Form layout='vertical' onFinish={handleSubmit}>
            <Form.Item label="Amount" name="amount">
              <Input type="text"/>
            </Form.Item>

            <Form.Item label="type" name="type">
               <Select>
                  <Select.Option value="income">Income</Select.Option>
                  <Select.Option value="expense">Expense</Select.Option>
               </Select>
            </Form.Item>

            <Form.Item label="Category" name="type">
               <Select>
                  <Select.Option value="salary">Salary</Select.Option>
                  <Select.Option value="tip">Tip</Select.Option>
                  <Select.Option value="project">Project</Select.Option>
                  <Select.Option value="food">Food</Select.Option>
                  <Select.Option value="movie">Movie</Select.Option>
                  <Select.Option value="bills">Bills</Select.Option>
                  <Select.Option value="medical">Medical</Select.Option>
                  <Select.Option value="fee">Fee</Select.Option>
                  <Select.Option value="tax">TAX</Select.Option>
               </Select>
            </Form.Item>
            <Form.Item label="Date" name="date">
              <Input type="date"/>
            </Form.Item>

            <Form.Item label="Reference" name="refrence">
              <Input type="text"/>
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input type="text"/>
            </Form.Item>

            <div className='d-flex justify-content-end'>
              <button type="submit" className='btn btn-primary'>Save</button>

            </div>
          </Form>
        </Modal>
    </Layout>
  )
}

export default HomePage;
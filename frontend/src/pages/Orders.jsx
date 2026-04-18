import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { useEffect } from 'react';
import axios from 'axios';

function Orders() {

  const { currency, backendUrl, token } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(`${backendUrl}/api/order/userOrders`, {}, { headers: { token } })
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())

      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'order placed':
        return 'bg-blue-500'
      case 'packing':
        return 'bg-yellow-500'
      case 'shipped':
        return 'bg-purple-500'
      case 'out for delivery':
        return 'bg-orange-500'
      case 'delivered':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusStep = (status) => {
    switch (status.toLowerCase()) {
      case 'order placed':
        return 1
      case 'packing':
        return 2
      case 'shipped':
        return 3
      case 'out for delivery':
        return 4
      case 'delivered':
        return 5
      default:
        return 1
    }
  }

  return (
    <div className='border-t pt-16 min-h-screen'>
      <div className='text-2xl mb-8'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className='space-y-6'>
        {
          orderData.map((item, index) => (
            <div key={index} className='order-card bg-(--surface) dark:bg-(--surface-elevated) rounded-2xl shadow-soft-md border border-(--border) overflow-hidden hover:shadow-soft-lg transition-all duration-300'>
              {/* Order Header */}
              <div className='bg-(--surface-elevated) dark:bg-(--surface-deep) px-6 py-4 border-b border-(--border)'>
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-(--neon-accent)/10 rounded-xl flex items-center justify-center'>
                      <span className='text-(--neon-accent) font-bold text-lg'>#{index + 1}</span>
                    </div>
                    <div>
                      <p className='text-sm text-(--muted)'>Order Date</p>
                      <p className='font-medium text-(--text)'>{new Date(item.date).toDateString()}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <span className={`status-badge px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                    <button
                      onClick={loadOrderData}
                      className='bg-(--neon-accent) hover:bg-(--neon-accent)/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105'
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Content */}
              <div className='p-6'>
                <div className='flex flex-col lg:flex-row gap-6'>
                  {/* Product Info */}
                  <div className='flex gap-4 flex-1'>
                    <div className='w-20 h-20 bg-gray-100 dark:bg-(--surface-elevated) rounded-lg overflow-hidden flex-shrink-0'>
                      <img className='w-full h-full object-cover' src={item.image[0]} alt="" />
                    </div>
                    <div className='flex-1'>
                      <h3 className='font-semibold text-(--text) text-lg mb-2'>{item.name}</h3>
                      <div className='flex flex-wrap items-center gap-4 text-sm text-(--muted)'>
                        <span className='flex items-center gap-1'>
                          <span className='font-medium text-(--neon-accent)'>{currency}{item.price}</span>
                        </span>
                        <span>Qty: {item.quantity}</span>
                        <span>Size: {item.size}</span>
                        <span className='flex items-center gap-1'>
                          <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                          {item.paymentMethod}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Timeline */}
                  <div className='lg:w-80'>
                    <h4 className='font-medium text-(--text) mb-4'>Order Progress</h4>
                    <div className='order-timeline'>
                      {/* Timeline Steps */}
                      {[
                        { label: 'Order Placed', step: 1 },
                        { label: 'Packing', step: 2 },
                        { label: 'Shipped', step: 3 },
                        { label: 'Out for Delivery', step: 4 },
                        { label: 'Delivered', step: 5 }
                      ].map((step, stepIndex) => (
                        <div key={stepIndex} className={`timeline-step ${getStatusStep(item.status) >= step.step ? 'completed' : ''} ${getStatusStep(item.status) === step.step ? 'active' : ''} relative flex items-center gap-4 mb-4`}>
                          <div className='timeline-dot w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300'>
                            {getStatusStep(item.status) >= step.step ? '✓' : step.step}
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${
                              getStatusStep(item.status) >= step.step
                                ? 'text-(--text)'
                                : 'text-(--muted)'
                            }`}>
                              {step.label}
                            </p>
                            {getStatusStep(item.status) === step.step && (
                              <p className='text-xs text-(--neon-accent)'>Current Step</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders

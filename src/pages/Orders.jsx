import React, { useEffect, useState } from 'react';
import SlotsDataService from "../services/slots"
import OrdersDataService from '../services/orders';

function Orders(props) {
  const [orders, setOrders] = useState([]);
  const init = ()=>{
    SlotsDataService.getSlots().then(res=>{
      OrdersDataService.getOrders(localStorage.getItem('user')).then(res=>{
        /**
         *  这个地方一个是getorders的userid我忘了是不是从本地取了
         *  第二个就是getsolts不传时间的时候应该是获取全部吧？
         *  还有就是看一下我写的和你返回的res的参数对上对不上，对上的话基本没啥问题了
         * 
         */
        const oids = res.data.orderid;
        let c = []
        oids.forEach(el => {
          res.data.forEach(re=>{
            if(el==re._order){
              c.push(re)
            }
          })
        });
        setOrders([...c])
      })

    })
  }
  const deleteOrderHandle = (id)=>{
    OrdersDataService.deleteOrder(id).then(res=>{
      init()
    })
  }

  useEffect(() => {
    init()
   
  }, []);

  return (
    <div>
      <h2>订单列表</h2>
      <div>
        {orders.map(order => (
          <Card
          key={order._id}
          title={order._slot}
          style={{
            width: 300,
            cursor: "pointer",
            marginRight:"20px"
          }}
        >
          <p>venue: {order._slot}</p>
          <p>date: {order._date}</p>
          <p>reserveActive: {order._order ? "yes" : "no"}</p>
          {props.login && (
            <Button
              style={{}}
              onClick={() => {
                deleteOrderHandle(order._id);
              }}
            >
              delete
            </Button>
          )}
        </Card>
        ))}
      </div>
    </div>
  );
}

export default Orders;

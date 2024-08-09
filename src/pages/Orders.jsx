import React, { useEffect, useState } from 'react';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
   
  }, []);

  return (
    <div>
      <h2>订单列表</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            订单号: {order.id}, 场地: {order.court}, 时间: {order.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;

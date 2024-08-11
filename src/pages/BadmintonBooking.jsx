import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import SlotsDataService from '../service/slots';
import OrdersDataService from '../service/orders';

function getDates(daysToAdd) {
  const result = [],result2 = []
  const currentDate = new Date();
  for (let i = 0; i <= daysToAdd; i++) {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + i);
    const month = newDate.getMonth() + 1; // 月份从0开始，所以加1
    const day = newDate.getDate();
    result.push(`${month}/${day}`);
    let str = newDate.toISOString()
    result2.push(`${str.substring(0,11)}00:00:00.000%2B00:00`)
  }
  return [result,result2]
}

function BadmintonBooking(user) {
  // 计算七天后的日期
  const dates = getDates(7);
  const [morning, setMorning] = useState([]);
  const [afternoon, setAfternoon] = useState([]);
  const [active, setActive] = useState({
    index:0,
    ac:dates[0][0]
  });

  const init = (date) => {

      SlotsDataService.getSlots(date).then(res=>{
        console.log(res,'res');
        let a = [],
        b = [];
      res.data.forEach((re) => {
        if (re._time === "09:00-12:00") {
          a.push(re);
        } else {
          b.push(re);
        }
      });
      setMorning([...a]);
      setAfternoon([...b]);
        
      })
  };

  const reserveHandle = (slotId) => {
    // user 没有传进去
    OrdersDataService.addOrders(user).then(order=>{
      SlotsDataService.updateSlot(slotId, order.data.orderId).then(sl=>{
        init(dates[1][active.index])
      })
    });
  };

  useEffect(() => {
    init(dates[1][0]);
  }, []);
  return (
    <div style={{ width: "100vw", boxSizing: "border-box", padding: "20px" }}>
      <h2>羽毛球场地预订</h2>
      <div className="dates">
        {dates[0].map((item,i) => {
          return (
            <div
              key={item}
              className={active.ac === item ? "date dateActive" : "date"}
              onClick={() => {
                setActive({
                  index:i,
                  ac:item
                });
                init(dates[1][i]);
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <div style={{ width: "100%", display: "flex", alignItems: "center", marginBottom: "20px"}}>
          <div  style={{width:"10%"}}>09:00 - 12:00 :</div>
          <div style={{width:"90%",overflowY:"auto", marginLeft:"20px",display:"flex"}}>
            {morning.map((slots) => (
              <Card
                key={slots._id}
                title={slots._slot}
                style={{
                  width: 300,
                  cursor: "pointer",
                  marginRight:"20px"
                }}
              >
                <p>venue: {slots._slot}</p>
                <p>reserveActive: {slots._order ? "yes" : "no"}</p>
                {user && (
                  <Button
                    disabled={slots._order ? true : false}
                    style={{}}
                    onClick={() => {
                      // userId
                      reserveHandle(slots._id);
                    }}
                  >
                    reserve
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>
        <div style={{ width: "100%", display: "flex", alignItems: "center"  }}>
          <div style={{width:"10%"}}>13:00 - 16:00 : </div>
          <div style={{width:"90%",overflowY:"auto", marginLeft:"20px",display:"flex"}}>
            {afternoon.map((slots) => (
              <Card
                key={slots._id}
                title={slots._slot}
                style={{
                  width: 300,
                  cursor: "pointer",
                  marginRight:"20px"
                }}
              >
                <p>venue: {slots._slot}</p>
                <p>reserveActive: {slots._order ? "yes" : "no"}</p>
                {user && (
                  <Button
                    disabled={slots._order ? true : false}
                    style={{}}
                    onClick={() => {
                      reserveHandle(slots._id);
                    }}
                  >
                    reserve
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BadmintonBooking;

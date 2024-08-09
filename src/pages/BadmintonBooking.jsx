import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { List, Button } from "antd";

function getDates(daysToAdd) {
  const result = [];
  const currentDate = new Date();
  for (let i = 0; i <= daysToAdd; i++) {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + i);
    const month = newDate.getMonth() + 1; // 月份从0开始，所以加1
    const day = newDate.getDate();
    result.push(`${month}/${day}`);
  }
  return result;
}

function BadmintonBooking(props) {
  // 计算七天后的日期
  const dates = getDates(7);
  console.log(dates);
  const [morning, setMorning] = useState([]);
  const [afternoon, setAfternoon] = useState([]);
  const [active, setActive] = useState(dates[0]);
  const lc = useLocation();
  let id = lc.state && lc.state.id ? lc.state.id : "";

  const init = (date) => {
    fetch("/data/booking.json?" + id)
      .then((res) => res.json())
      .then((res) => {
        let a = [],
          b = [];
        res.forEach((re) => {
          if (re._time == "09:00-12:00") {
            a.push(re);
          } else {
            b.push(re);
          }
        });
        setMorning([...a]);
        setAfternoon([...b]);
      });
  };

  const reserveHandle1 = (id) => {
    let morningc = morning.map((it) => {
      if (it._id == id) {
        return {
          ...it,
          _order: !it._,
        };
      } else {
        return it;
      }
    });
    setMorning([...morningc]);
  };
  const reserveHandle2 = (id) => {
    let afternoonc = afternoon.map((it) => {
      if (it._id == id) {
        return {
          ...it,
          _order: !it._,
        };
      } else {
        return it;
      }
    });
    setAfternoon([...afternoonc]);
  };
  useEffect(() => {
    init(dates[0]);
  }, []);
  return (
    <div style={{ width: "100vw", boxSizing: "border-box", padding: "20px" }}>
      <h2>羽毛球场地预订</h2>
      <div className="dates">
        {dates.map((item) => {
          return (
            <div
              key={item}
              className={active == item ? "date dateActive" : "date"}
              onClick={() => {
                setActive(item);
                init(item);
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "45%" }}>
          <List
            header={<div>morning</div>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={morning}
            renderItem={(item) => (
              <List.Item>
                venue {item._slot} - reserveActive: {item._order ? "yes" : "no"}
                {props.login && (
                  <Button
                    disabled={item._order ? true : false}
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                      reserveHandle1(item._id);
                    }}
                  >
                    reserve
                  </Button>
                )}
              </List.Item>
            )}
          />
        </div>
        <div style={{ width: "45%" }}>
          <List
            header={<div>afternoon</div>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={afternoon}
            renderItem={(item) => (
              <List.Item>
                venue {item._slot} - reserveActive: {item._order ? "yes" : "no"}
                {props.login && (
                  <Button
                    disabled={item._order ? true : false}
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                      reserveHandle2(item._id);
                    }}
                  >
                    reserve
                  </Button>
                )}
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default BadmintonBooking;

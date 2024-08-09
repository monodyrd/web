import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Card } from 'antd';

function HomePage() {
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate()
  const push = (id)=>{
    navigate('/badminton',{state:{
      id
    }})
  }

  useEffect(() => {
   fetch("/data/home.json")
   .then(res=>res.json())
   .then(res=>{
    setVenues(res)
   })
  }, []);

  return (
    <div style={{width:'100vw',boxSizing:"border-box",padding:'20px'}}>
      <h2>场馆列表</h2>
      <div>
        {venues.map(venue => (
          <Card
          key={venue._id}
          title={venue.name}
          extra={<a onClick={()=>{
            push(venue._id)
          }} style={{color:"blue"}}>More</a>}
          style={{
            width: 300,
            cursor:"pointer"
          }}
          onClick={()=>{
            push(venue._id)
          }}
        >
          <p>{venue.name}</p>
          <p>{venue.address}</p>
        </Card>
        ))}
      </div>
   
    </div>
  );
}

export default HomePage;

import axios from 'axios';

class SlotsDataService {
  static getSlots(date) {
    let queryParam = '';
    if (date) {
      queryParam = `?date=${date}`;
    }
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/booking/slots${queryParam}`);
  }
  
  static updateSlot(slotId, orderId) {
    return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/booking/slots`, { slotId, orderId });
  }
}

export default SlotsDataService;
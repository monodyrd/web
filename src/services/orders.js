import axios from 'axios';

class OrdersDataService {
  static getOrders(userId) {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/booking/orders/${userId}`);
  }

  static addOrders(userId) {
    return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/booking/orders/${userId}`);
  }

  static deleteOrder(userId, orderId) {
    return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/booking/orders/${userId}/${orderId}`);
  }
}

const ordersDataService = new OrdersDataService();
export default ordersDataService;

import { useEffect, useReducer, useState, useContext } from 'react';
import CheckSteps from '../components/CheckSteps';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Store1 } from '../Store';
import { Navigate, useNavigate } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import LoadingSign from '../components/LoadingSign';
import axios from 'axios';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import ListGroupItem from 'react-bootstrap';
import { getError } from '../utils';
import { useParams } from 'react-router-dom';
// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true };
//     case 'FETCH_SUCCESS':
//       return { ...state, loading: false };
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
function OrderDetailsScreen() {
  const params = useParams();
  const { state } = useContext(Store1);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const { id } = params;

  console.log('ovdeeeeeeeee');
  useEffect(() => {
    //alert('uso');
    console.log('ovde sam 111');
    console.log(id);
    const fetchData = async () => {
      console.log('IVANAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
      try {
        console.log('USO SAM OVDE');
        console.log(id);
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/orders/oneOrder/${id}`
        );
        console.log('TJTJTJTJTJ');
        console.log(data);
        setOrder(data.data);
      } catch (err) {
        console.log(':(((');
        console.log(err);
      }
    };
    console.log('ovdeeee 22222');
    fetchData();
    console.log('ovdee 333');
  }, []);

  useEffect(() => {
    // alert('Drugi useEffect');
    console.log('ivana');
  }, []);
  console.log('qwerqwer weqrqwe');

  console.log(order);

  const submitHandler = () => {
    navigate(`/admin/orders`);
  };

  return (
    order && (
      <div>
        <h1>Detalji narudzbine</h1>
        <div>
          <Row>
            <Col md={3}>
              <ListGroup variant="flush">
                <h2>{order.code}</h2>

                <table className="table">
                  <thead>
                    <tr>
                      <th>SIFRA</th>
                      <th>ARTIKL</th>
                      <th>KOLICINA</th>
                      <th>CENA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems &&
                      order.orderItems.map((o) => (
                        <tr key={o._id}>
                          <td>{o._id}</td>
                          <td>{o.name}</td>
                          <td>{o.quantity}</td>
                          <td>{o.price}rsd</td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                <h3>
                  {' '}
                  Cena:
                  {order.orderItems &&
                    order.orderItems.reduce(
                      (p, c) => p + Number(c.price * c.quantity),
                      0
                    )}{' '}
                  rsd
                </h3>
                <Button onClick={submitHandler}>Nazad</Button>
              </ListGroup>
            </Col>
          </Row>
        </div>
      </div>
    )
  );
}

export default OrderDetailsScreen;

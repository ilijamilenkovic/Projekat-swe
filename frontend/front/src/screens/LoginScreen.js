import Button from 'react-bootstrap/Button';
import { Container, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { Store1 } from '../Store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Alert } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { getError } from '../utils';
import { useSnackbar } from 'notistack';

export default function SigninScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const { search } = useLocation();
  const redirectURL = new URLSearchParams(search).get('redirect');
  const redirect = redirectURL ? redirectURL : '/';

  const { state, dispatch: ctxDispatch } = useContext(Store1);
  const { userInfo } = state;

  const submitHandler = async (i) => {
    i.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/v1/users/login',
        {
          email,
          password,
        }
      );
      console.log(data.user);
     
      ctxDispatch({ type: 'USER_LOGIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data)); //pretvara se 8u string jer podaci u lacalstorage treba da budu stringovi
      navigate(redirect || '/');
    } catch (err) {
    
        toast.error("Netačan email ili šifra!");
      return;
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect); ///da ne mozes ulogovan da ides opet na signin screen
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <h1>Log In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            required
            onChange={(p) => setPassword(p.target.value)}
          />
          <Link to="/InputMail">Zaboravili ste sifru?</Link>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Log in</Button>
        </div>
        <div className="mb-3">
          Novi korisnik?{' '}
          <Link to={`/signin?redirect=${redirect}`}>Napravi novi nalog</Link>
        </div>
      </Form>
    </Container>
  );
}

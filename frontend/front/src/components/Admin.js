import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { Store1 } from '../Store';

export default function Admin({children})
{
    const {state}=useContext(Store1);
    const {userInfo}=state;

    return userInfo && userInfo.data.user.role==='store-admin' ? children:<Navigate to="/login" />
}
import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import {LoaderDiv} from './Loader.styled'
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const Loader = () => {
   return (
      <LoaderDiv>
         <InfinitySpin width="200" color="#4fa94d" />
      </LoaderDiv>
   )
   
};

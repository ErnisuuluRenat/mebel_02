import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Result.scss';
import { useQuery } from 'react-query';

const fetchResult = async (id) => {
  const token = localStorage.getItem('token');

  const config = {
    headers : {
      Authorization: `Bearer ${token}`,
    }
  }

  const { data } = await axios.get(
    `http://46.8.43.42:8080/api/v1/authenticated/detail/list/${id}`,config
  );
  return data;
};

const Result = () => {
  const {id} = useParams();
  const { isLoading, data, isError } = useQuery("paper",() => fetchResult(id));

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {isError.message}</div>;

  console.log(data)

  
  console.log(id)
  return (
    <div className='result'>{data.map((obj) => (
      <div className='content'>
        <h3>{obj.result?.worker?.name}</h3>
        <h4>{obj.result?.localDate}</h4>
      </div>
    ))}

      <table>
        <thead>
        <th>Paper Name</th>
        <th>width</th>
        <th>height</th>
        <th>кол-во</th>
        </thead>
        <tbody>
          {data.map((obj) => (
            <>
            <tr>
              <td>{obj.result?.paper?.name}</td>
              <td>{obj.result?.paper?.width}</td>
              <td>{obj.result?.paper?.height}</td>
              <td>{obj.result?.quantity}</td>
            </tr>
            <tr>
              <td>Детали</td>
              <td>{obj.width}</td>
              <td>{obj.height}</td>
              <td>{obj.quantity}</td>
            </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Result
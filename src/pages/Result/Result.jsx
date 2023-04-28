import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Result.scss';
import { useQuery } from 'react-query';
import { CSVLink } from 'react-csv';

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
  
  if(!data) return <div>Sorry the data was writting incorrectly</div>

  const tdElements = data.map((obj, index) => {
    const paddedIndex = (index + 1).toString().padStart(3, '0');
    const tdText = `P${paddedIndex}`;
    return (
      <tr key={index}>
        <td>{tdText}</td>
        <td>{obj.width}</td>
        <td>{obj.height}</td>
        <td>{obj.quantity}</td>
      </tr>
    );
  });

  const headers = [
    { label: 'Worker Name', key: 'workerName' },
    { label: 'Local Date', key: 'localDate' },
    { label: 'Paper Name', key: 'paperName' },
    { label: 'Paper Height', key: 'paperHeight' },
    { label: 'Paper Width', key: 'paperWidth' },
    { label: 'Quantity', key: 'quantity' },
    { label: 'Part Name', key: 'partName' },
    { label: 'Length', key: 'length' },
    { label: 'Width', key: 'width' },
    { label: 'Request', key: 'request' },
  ];

  const csvData = data.map((obj) => ({
    workerName: obj.result.worker.name,
    localDate: obj.result.localDate,
    paperName: obj.result.paper.name,
    paperHeight: obj.result.paper.height,
    paperWidth: obj.result.paper.width,
    quantity: obj.result.quantity,
    partName: obj.result.part.name,
    length: obj.result.part.height,
    width: obj.result.part.width,
    request: obj.result.part.request,
  }));

  console.log(data)
  
  console.log(id)
  return (
    <div className='result'>
      <div key={data[0].id}>
      <div className='content'>
        <h3>{data[0].result.worker.name}</h3>
        <h4>{data[0].result.localDate}</h4>
        <CSVLink data={csvData} headers={headers} filename={'mydata.csv'}>
        Download CSV
      </CSVLink>
      </div>
      <div className='paper'>
        <h3>PaperName</h3>
        <p>{data[0].result.paper.name}</p>
        <p>длина: {data[0].result.paper.height}</p>
        <p>ширина: {data[0].result.paper.width}</p>
        <p>кол-во: {data[0].result.quantity}</p>
      </div>
      </div>
      <table>
      <thead>
          <tr id={data[0].id + data[0].result.id}>
            <th>PartName</th>
            <th>Lenght</th>
            <th>Width</th>
            <th>Request</th>
          </tr>
        </thead>
        <tbody>
          {tdElements}
        </tbody>
      </table>
    </div>
  )
}

export default Result
import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import './Archieve.scss'
import { Link } from "react-router-dom";

const fetchResult = async (pageNo) => {
  const token = localStorage.getItem('token');

  const config = {
    headers : {
      Authorization: `Bearer ${token}`,
    }
  }

  const { data } = await axios.get(
    `http://46.8.43.42:8080/api/v1/authenticated/result/list?pageNo=${pageNo}&pageSize=10`,config
  );
  return data;
};


const Archive = () => {
  const [pageNo, setPageNo] = React.useState(0);
  const { isLoading, data, isError } = useQuery(['detail', pageNo], () => fetchResult(pageNo), {keepPreviousData : true});

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {isError.message}</div>;

  const handlePrevClick = () => {
    setPageNo((prev) => Math.max(prev - 1, 0));
  };

  const handleNextClick = () => {
    setPageNo((prev) => prev + 1);
  };

  const totalPages = data.totalPages - 1 ;
  console.log(totalPages)

  return (
    <>
      <div className="archieve">
        <h1>Archive :</h1>
        <ul>
          {data.content?.filter((item) => item.localDate && item.paper.name  && item.worker.name).sort((a, b) => {
            const dateA = new Date(`${a.localDate}T${a.localTime.hour}:${a.localTime.minute}:${a.localTime.second}.${a.localTime.nano}Z`);
            const dateB = new Date(`${b.localDate}T${b.localTime.hour}:${b.localTime.minute}:${b.localTime.second}.${b.localTime.nano}Z`);
            return dateB - dateA;
          }).map((item,i) => (
            <li key={item.localDate + i}><Link to={`/result/${item.id}`}><p>{item.localDate + ' ' + item.localTime}</p>, {item.paper?.name}, {item.worker?.name}</Link></li>
          ))}
          </ul>
          <div className="paginate">
            <button onClick={() => handlePrevClick()} className="prev">Prev</button>
            <button onClick={() => handleNextClick()} className="next">Next</button>
            <div className="totalPage">{pageNo} / {totalPages}</div>
          </div>
      </div>
    </>
  );
};

export default Archive;

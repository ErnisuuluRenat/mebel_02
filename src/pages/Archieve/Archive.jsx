import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import './Archieve.scss'
import { Link } from "react-router-dom";

const fetchResult = async () => {
  const token = localStorage.getItem('token');

  const config = {
    headers : {
      Authorization: `Bearer ${token}`,
    }
  }

  const { data } = await axios.get(
    "http://46.8.43.42:8080/api/v1/authenticated/result/list",config
  );
  return data;
};

const Archive = () => {
  const { isLoading, data, isError } = useQuery("paper", fetchResult);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {isError.message}</div>;

  return (
    <>
      <div className="archieve">
        <h1>Archive :</h1>
        <ul>
          {data.filter((obj) => obj.localDate && obj.paper  && obj.worker).sort((a, b) => new Date(b.localDate) - new Date(a.localDate)).map((obj,i) => (
            <li key={obj.localDate + i}><Link to={`/result/${obj.id}`}><p>{obj.localDate}</p>, {obj.paper?.name}, {obj.worker?.name}</Link></li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Archive;

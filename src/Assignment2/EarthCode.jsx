import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Earth.scss";

const EarthCode = () => {
  const [post, setPost] = useState([]);

  const { register, handleSubmit, watch } = useForm();

  const EarthCode = watch("code");

  const isValid = EarthCode;

  const onSubmit = (data) => {
    console.log(data);
    const url = `https://restcountries.com/v2/callingcode/${data.code}`;
    axios.get(url).then((response) => {
      setPost(response.data[0]);
      console.log(response.data[0]);
    });
  };

  return (
    <div className="earth pt-4 container">
      <form onSubmit={handleSubmit(onSubmit)} className="col-md-4">
        <input
          className="border border-primary rounded-3  p-2 col-md-12"
          id="name"
          type="text"
          placeholder="Earth Code"
          {...register("code")}
        />
        <div className="mt-3 d-flex p-2 justify-content-evenly col-md-12 btn-box">
          <button
            className={(isValid ? "enablebtn " : "disablebtn", "col-md-4")}
            type="submut"
            disabled={!isValid}
          >
            Submit
          </button>
          <button type="button" className="col-md-6">
            Capital Weather
          </button>
        </div>
      </form>
      <div className="earth-show-dat col-md-6 mt-5">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Country Name</th>
              <th>Capital</th>
              <th>Population</th>
              <th>Lat&Lng</th>
              <th>Country Flag</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>{post.name}</p>
              </td>
              <td>
                {" "}
                <p>{post.capital}</p>
              </td>
              <td>
                <p>{post.population}</p>
              </td>

              <td>
                <p>{post.latlng[0] + " , " + post.latlng[1]}</p>
              </td>
              <td>
                <img src={post.flag ? post.flag : ""} alt="flag" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EarthCode;

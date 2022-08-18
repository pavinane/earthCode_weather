import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Earth.scss";

const EarthCode = () => {
  const [post, setPost] = useState([]);
  const [weather, setWeather] = useState([]);

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

  const onWeather = () => {
    const url = `http://api.weatherstack.com/current?access_key=92387fac97863e89210abb48ebf0b520&QUERY=${post.capital}`;
    axios.get(url).then((response) => {
      //   setPost(response.data.near_earth_objects[0]);
      setWeather(response.data.current);
      console.log("weather", response.data.current);
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
        </div>
      </form>
      <div className="earth-show-dat col-md-8 mt-5">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Country Name</th>
              <th>Capital</th>
              <th>Population</th>
              <th>Lat&Lng</th>
              <th>Country Flag</th>
              <th>Weather</th>
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
                <p>{post.latlng}</p>
              </td>
              <td>
                <img src={post.flag ? post.flag : ""} alt="flag" />
              </td>
              <td>
                <button className="btn btn-primary" onClick={onWeather}>
                  Weather
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="d-flex col-md-8 justify-content-evenly flex-column text-white ">
        <p>
          <b>Country</b>: &nbsp;{post.name}
        </p>
        {weather && (
          <>
            <p>
              <b>Temperature</b>: &nbsp;{weather.temperature}
            </p>
            <p>
              <b>WindSpeed</b>: &nbsp; {weather.wind_speed}
            </p>
            <div>
              <p>
                <b>Icons</b>:&nbsp; <img src={weather.weather_icons} alt="" />
              </p>
            </div>
            <p>
              <b>Precip</b>: &nbsp;{weather.precip}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default EarthCode;

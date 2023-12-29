import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import place_hodler_img from "../Assets/default_img.jpg";
import fetchImageFromApi from "../../lib/fetch-image-from-api";

const ImageGenerator = () => {
  const [img_url, setImg_url] = useState("/");
  let inputRef = useRef(null);
  const [loading, setloading] = useState(false);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return;
    }
    setloading(true);

    let response = null;
    try {
      inputRef && (response = await fetchImageFromApi(inputRef));
      let data = await response.json();
      let data_array = data.data;
      if (data_array) {
        console.log(data_array);
        setImg_url(data_array[0].url);
      }
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      setloading(false);
    }

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span> generator</span>
      </div>

      <div className="image-loading">
        <div className="image">
          <img
            src={img_url === "/" ? place_hodler_img : img_url}
            alt=""
            className=""
          />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>
            Loading...
          </div>
        </div>
      </div>
      <div className="search-box">
        <input
          ref={inputRef}
          className="search-input"
          placeholder="Describe What you Want To See"
          type="text"
        />
        <div onClick={() => imageGenerator()} className="generate-btn">
          Go
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;

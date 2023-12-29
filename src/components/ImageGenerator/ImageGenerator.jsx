import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import { fetchImageFromApi } from "../../lib/fetch-image-from-api";

export default function ImageGenerator() {
  const [img_url, setImg_url] = useState("/");
  let inputRef = useRef(null);
  const [loading, setloading] = useState(false);

  const imageGenerator = async () => {
    if (!inputRef) {
      return;
    }
    setloading(true);
    let response = null;

    try {
      response = await fetchImageFromApi({ inputRef });
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
  };

  const handleSubmitForm = (event) => {
    if (event.key === "Enter" && !loading) {
      imageGenerator();
    }
  };

  return (
    <div className="ai-image-generator">
      <div className="header !text-gray-50">
        Image generator <span>OpenAI </span>
      </div>

      <div className="image-loading">
        <div className="image">
          <img
            src={img_url === "/" ? "default_img.jpg" : img_url}
            alt=""
            className=""
          />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}></div>
        </div>
      </div>
      <div className="search-box">
        <input
          ref={inputRef}
          className={`search-input ${loading ? "disabled" : ""}`}
          placeholder="Describe What you Want To See"
          type="text"
          onKeyDown={handleSubmitForm}
          disabled={loading}
        />
        <button
          onClick={() => imageGenerator()}
          className={`generate-btn ${loading ? "disabled" : ""}`}
          disabled={loading}
        >
          GO
        </button>
      </div>
    </div>
  );
}

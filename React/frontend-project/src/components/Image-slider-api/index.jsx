import "./style.css";
import { useEffect, useState } from "react";
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";

export default function ImageSlider({ url, limit = 5, page = 1 }) {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [errMessage, setErrMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);

      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (err) {
      setErrMessage(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);

  function handlePrevious() {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  }
  function handleNext() {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  }

  if (loading) {
    return <div>loading data please wait</div>;
  }
  if (errMessage !== null) {
    return <div>Error occurred! {errMessage}</div>;
  }

  return (
    <div className="container">
      <BsArrowLeftCircleFill
        onClick={()=>handlePrevious()}
        className="arrow arrow-left"
        size={25}
      />
      {images && images.length
        ? images.map((imageItem, index) => (
            <img
              key={imageItem.id}
              src={imageItem.download_url}
              alt={imageItem.download_url}
              className={
                currentImage === index
                  ? "current-image"
                  : "current-image hide-currrent-image"
              }
            />
          ))
        : null}

      <BsArrowRightCircleFill
        onClick={()=>handleNext()}
        className="arrow arrow-right"
        size={25}
      />

      <span className="circle-indicators">
        {images && images.length
          ? images.map((_, index) => (
              <button
                key={index}
                className={
                  currentImage === index
                    ? "current-indicator"
                    : "current-indicator inactive-indicator"
                }
                onClick={() => setCurrentImage(index)}
              ></button>
            ))
          : null}
      </span>
    </div>
  );
}

import { useState, useEffect } from 'react';

const endpoint = 'https://www.reddit.com/r/aww/top/.json?t=all';

const structureImages = (data) => {
  return data.reduce((prev, cur) => {
    return [...prev, cur.data.thumbnail];
  }, []);
};

const ImageCarousel = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const getImages = async () => {
      try {
        const res = await fetch(endpoint, { signal });
        const response = await res.json();
        if (response?.data?.dist > 0) {
          setImages(structureImages(response.data.children));
        } else {
          setError("There was an error with Reddit's enpoint");
        }
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    getImages();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    error,
    loading,
    images,
  };
};

export default ImageCarousel;

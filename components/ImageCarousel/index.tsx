import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import useImages from './useImages';
import styles from './carousel.module.scss';
/*
Prompt https://frontendeval.com/questions/image-carousel
Create an image carousel that cycles through images fetched from an endpoint (displaying a new image every 3 seconds), and allows the user to skip to the next/previous image.

endpoint - https://www.reddit.com/r/aww/top/.json?t=all
{
  data: {
    children: [
      {
        data: {
          thumbnail: "*.jpg"
        }
      },
      ...
    ]
  }
}

*/

let timeout = null;

const ImageCarousel = () => {
  const { images, error, loading } = useImages();
  const [activeImage, setActiveImage] = useState(0);

  const goBackImage = () => {
    let newImage = activeImage - 1;
    if (newImage < 0) {
      newImage = images.length - 1;
    }
    setActiveImage(newImage);
  };

  const goForwardImage = () => {
    let newImage = activeImage + 1;
    if (newImage > images.length - 1) {
      newImage = 0;
    }
    setActiveImage(newImage);
  };

  useEffect(() => {
    clearTimeout(timeout);
    if (images.length > 0) {
      timeout = setTimeout(goForwardImage, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [images, activeImage]);

  if (loading) {
    return (
      <div role="alert" className={styles.alert}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className={styles.alert}>
        There was an error: {error}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div role="alert" className={styles.alert}>
        No images found for carousel
      </div>
    );
  }

  return (
    <div className={styles.carousel}>
      <button className={clsx(styles.arrow, styles.backArrow)} type="button" onClick={goBackImage}>
        &larr;
      </button>
      {images.map((image, i) => (
        <img
          src={image}
          key={image}
          alt={`reddit ${i}`}
          className={clsx(i === activeImage && styles.activeImage, styles.image)}
        />
      ))}
      <button className={clsx(styles.arrow, styles.forwardArrow)} type="button" onClick={goForwardImage}>
        &rarr;
      </button>
    </div>
  );
};

export default ImageCarousel;

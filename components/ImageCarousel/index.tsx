import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
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

const endpoint = 'https://www.reddit.com/r/aww/top/.json?t=all';

const structureImages = (data) => {
  return data.reduce((prev, cur) => {
    return [...prev, cur.data.thumbnail];
  }, []);
};

let timeout = null;

const ImageCarousel = () => {
  const [images, setImages] = useState([
    'https://b.thumbs.redditmedia.com/wMY3nkccnU7gRcXDLnGHshGnIic1rHgchauFoEpZM-A.jpg',
    'https://b.thumbs.redditmedia.com/1oFC2nVfUVhj07aVnln8BAymnGaNwz-visvmQ05QDKE.jpg',
    'https://b.thumbs.redditmedia.com/T0zVXdl5mDoFCZvhv4moqQueQIMXMRL8qEJzH0rjG6Q.jpg',
    'https://a.thumbs.redditmedia.com/IAGlSIywhaZIaTwKeowoNNfAUFoDdBtQ7kDs2iW05v8.jpg',
    'https://a.thumbs.redditmedia.com/KdgF9Pb-FKWDUzzUWevt2l9qoi07Pvry8KLjXOD8N90.jpg',
    'https://b.thumbs.redditmedia.com/ZYbR5qfQugEaZCmqQbsIoiSboke5Wg_qS02co6_9EXI.jpg',
    'https://b.thumbs.redditmedia.com/Hw_Jkc6deXlTKf_CeuTXRXRqhXF3Scfrq0dbhXWFTXc.jpg',
    'https://b.thumbs.redditmedia.com/I1pzdr6yWV69DKefwWtTpUwuSWuLqCyFbnj9L5F6XzU.jpg',
    'https://b.thumbs.redditmedia.com/UzwFlv-3K7cDKjf9jhUMXikn-6QzD1ZMRtzGSBTqBnk.jpg',
    'https://b.thumbs.redditmedia.com/G1xid8Zkv_m5KzennH52kBnyWuodMr4DjLUADU1yFIk.jpg',
    'https://a.thumbs.redditmedia.com/qCAIBve2zCPLPr48xci79nnB-OS9Zb5bgwq7yveolt0.jpg',
    'https://b.thumbs.redditmedia.com/5W8YZJCkzKTWbnMz4-lKzzGx_wgp8z_imnTQ96AGwwM.jpg',
    'https://b.thumbs.redditmedia.com/GiXdntAWEItxLwg1QFsVmbwBPQ4ZfZqaY8lvi8AKVfI.jpg',
    'https://b.thumbs.redditmedia.com/OnjGwMqxjugXSrkGvMbzkoOuZMBLjF6yjg8_bZTgBIY.jpg',
    'https://b.thumbs.redditmedia.com/-uZp_L55w0bsAY85_jbTh68-qz-Iz5j-lI-UNaz1lyU.jpg',
    'https://a.thumbs.redditmedia.com/pH6JO2SQH_7pKvXYhyIWTNppcqvSQG1TDfd3UXM8rO4.jpg',
    'https://b.thumbs.redditmedia.com/t9DyS4JczF4Jpv2IvIciWK9EOHCrSqiTEKc0y-iVoTw.jpg',
    'https://b.thumbs.redditmedia.com/AhixQwHZw7wZp62ogoWMWWywm4X-hELrF97Hn3hMGsk.jpg',
    'https://b.thumbs.redditmedia.com/AYdQ61Vywu3KHrBqcstGqgVDB2YP59qoBPR0wjFMV7Q.jpg',
    'https://b.thumbs.redditmedia.com/lr3We7Na23oYetXwcIWiPKLtWgGscIu1ESD6QHkPYnk.jpg',
    'https://b.thumbs.redditmedia.com/yLdnWaRG5umro-4Hq6_br2rX-47tBgR7pQttatYn3fk.jpg',
    'https://a.thumbs.redditmedia.com/3GvmNmjg20qRHebCsnkYwTgtAgI8JtApR128Qb-uAf4.jpg',
    'https://a.thumbs.redditmedia.com/Wu1NaqNHf4NS3nCZ4PdzGRgrCjHfO7Qcz689i_iNd14.jpg',
    'https://b.thumbs.redditmedia.com/0uKOkz9fKnkk5Yj698gzmdL7eaQFDHBJ00ulWVQ4zpI.jpg',
    'https://b.thumbs.redditmedia.com/Q9-LCOFoY_4gO3YBhFDAgKUokqo9rHT59E2tYgOISMA.jpg',
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const { signal } = controller;
  //   const getImages = async () => {
  //     try {
  //       const res = await fetch(endpoint, { signal });
  //       const response = await res.json();
  //       if (response?.data?.dist > 0) {
  //         setImages(structureImages(response.data.children));
  //       } else {
  //         setError("There was an error with Reddit's enpoint");
  //       }
  //     } catch (err) {
  //       setError(err);
  //     }
  //     setLoading(false);
  //   };
  //   getImages();

  //   return () => {
  //     controller.abort();
  //   };
  // }, []);

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
    return <div role="alert">Loading...</div>;
  }

  if (error) {
    return <div role="alert">There was an error: {error}</div>;
  }

  if (images.length === 0) {
    return <div role="alert">No images found for carousel</div>;
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

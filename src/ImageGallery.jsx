import React, { useState, useEffect } from 'react';

function ImageDisplay() {
  const [numImages, setNumImages] = useState(60); // replace with the actual number of images
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imageNames = Array.from(Array(numImages).keys()).map((i) => `food (${i + 1}).jpg`);

    Promise.all(imageNames.map((imageName) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image ${imageName}`));
        img.src = `https://food-gallery.jaymmy.xyz/images/${imageName}`; // replace with the appropriate URL for your server and image directory
      });
    }))
    .then((loadedImages) => {
      setImages(loadedImages);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [numImages]);

  return (
    <div className='image-gallery'>
      {isLoading ? (
        <p>Loading images...</p>
      ) : (
        images.map((image, index) => (
          <img key={index} src={image.src} alt={`Food ${index + 1}`} />
        ))
      )}
    </div>
  );
}

export default ImageDisplay;

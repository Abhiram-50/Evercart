import { useState } from 'react';

const ProductGallery = ({ images = [], title = '' }) => {
  const [activeImage, setActiveImage] = useState(images[0] || '');

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-[24px] border border-slate-200 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800">
        <img src={activeImage} alt={title} className="mx-auto h-[320px] w-full object-contain transition duration-300 hover:scale-105" />
      </div>
      <div className="flex gap-3 overflow-x-auto">
        {images.map((image) => (
          <button
            key={image}
            onClick={() => setActiveImage(image)}
            className={`h-20 w-20 shrink-0 rounded-[16px] border p-2 ${activeImage === image ? 'border-blue-500' : 'border-slate-200 dark:border-slate-700'}`}
            aria-label={`Show ${title} view`}
          >
            <img src={image} alt="thumbnail" className="h-full w-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;

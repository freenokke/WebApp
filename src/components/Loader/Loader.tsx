import { ThreeCircles } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="flex w-full h-full items-center justify-center absolute inset-0 backdrop-blur z-10">
      <ThreeCircles color='var(--font-color-secondary)' height={100} width={100} />
    </div>
  );
};

export default Loader;
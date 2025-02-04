import Navbar from './components/Navbar';
import ModelView from './components/Model';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';

const App = () => {
  const handleDimensionChange = (dimensions) => {
    console.log('Updated Dimensions:', dimensions);
    // Update the model dimensions in your 3D logic
  };

  const handleColorChange = (colors) => {
    console.log('Updated Colors:', colors);
    // Update the model colors in your 3D logic
  };

  return (
    <div className='relative'>
      <Navbar />
      <LeftSidebar />
      <ModelView />
      <RightSidebar
        onDimensionChange={handleDimensionChange}
        onColorChange={handleColorChange}
      />
    </div>
  );
};

export default App;

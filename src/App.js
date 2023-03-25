import './App.css';
import Header from './components/header';
import { DndProvider } from 'react-dnd';
import { HTML5Backend} from "react-dnd-html5-backend";
import Home from './pages/home';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header/>
      <Home/>
    </DndProvider>
  );
}

export default App;

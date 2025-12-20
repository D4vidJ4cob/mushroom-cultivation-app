// src/App.jsx
import { Link } from 'react-router';

function App() {
  return (
    <div className='bg-white text-gray-900'>
      <h1>Welcome!</h1>
      <p>Choose one of the following links:</p>
      <ul>
        <li>
          <Link to='/species' className="text-blue-600 underline">Species</Link> {/* 👈 */}
        </li>
        <li>
          <Link to='/mother-cultures' className="text-blue-600 underline">Mother Cultures</Link> {/* 👈 */}
        </li>
        <li>
          <Link to='/liquid-cultures' className="text-blue-600 underline">Liquid Cultures</Link> {/* 👈 */}
        </li>
        <li>
          <Link to='/grain-spawns' className="text-blue-600 underline">Grain Spawns</Link> {/* 👈 */}
        </li>
        <li>
          <Link to='/substrates' className="text-blue-600 underline">substrates</Link> {/* 👈 */}
        </li>
      </ul>

    </div>);
}

export default App;

// Libs
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// Components
import App from './App.tsx';
// Store
import store from './store/root';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);

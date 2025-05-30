import './App.css';

import { useEffect } from 'react';

import Header from './fragments/Header';
import Nav from './fragments/Nav';
import Aside from './fragments/Aside';
import Footer from './fragments/Footer';
import AppRoutes from './routes/AppRoutes';
import useAuthStore from './stores/authStore';

function App() {
  const {checkPrincipal} = useAuthStore();

  useEffect(() => {
    checkPrincipal();
  }, []);

  return (
    <div className="App">
      <Header />
      <Nav />
      <main>
        <Aside />
        <section>
          <AppRoutes />
        </section>
        <Aside />
      </main>
      <Footer />
    </div>
  );
}

export default App;

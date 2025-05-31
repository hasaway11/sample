import './App.css';

import { useEffect } from 'react';

import Header from './fragments/Header';
import Nav from './fragments/Nav';
import Aside from './fragments/Aside';
import Footer from './fragments/Footer';
import AppRoutes from './routes/AppRoutes';
import useAuthStore from './stores/authStore';

function App() {
  const checkAuth = useAuthStore(state=>state.checkAuth);

  // 아래 코드는 ()=>{return checkAuth()}이다.  useEffect는 뭔가를 리턴해서는 안된다
  // useEffect(()=>checkAuth(), []);

  useEffect(()=>{
    checkAuth();
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

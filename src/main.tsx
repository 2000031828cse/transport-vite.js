import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from './App';
import { SidebarProvider } from './contexts/SidebarContext';
import { StopsProvider } from './content/applications/Stops/StopsContext';
import BusRoutesProvider from './content/applications/Busroutes/BusRoutesContext';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <SidebarProvider>
        <BrowserRouter>
          <StopsProvider>
            <BusRoutesProvider>
              <App />
            </BusRoutesProvider>
          </StopsProvider>
        </BrowserRouter>
      </SidebarProvider>
    </HelmetProvider>
  </React.StrictMode>
);

serviceWorker.unregister();

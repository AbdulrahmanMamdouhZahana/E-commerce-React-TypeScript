import CartDrawer from "./components/ui/CartDrawer";
import { Provider } from "./components/ui/provider";
import Router from "./router";



function App() {


  return (
    <>
      <Provider>
     

        <CartDrawer/>
        <Router  />





      </Provider>
      

    </>
  )
    
}

export default App;
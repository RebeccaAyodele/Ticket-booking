import NavBar from "./components/NavBar";
import TicketForm from "./components/TicketForm";

function App() {
  return (
    <div className="py-[20px] flex flex-col items-center justify-center bg-gradient-to-tr from-[#0c1113] to-[#011d23]">
      <NavBar />
      
      <TicketForm />
    </div>
  );
}

export default App;

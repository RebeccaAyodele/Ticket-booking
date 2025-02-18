import Logo from "@/svg-folder/Logo";
import Ticz from "@/svg-folder/Ticz.";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="w-[83%] h-16 flex justify-between rounded-[12px] outline outline-1 outline-[#197686] bg-[#05252c] mx-auto px-[12px] py-[16px]">
      <div className="flex justify-between gap-4 my-auto">
        <Logo />
        <Ticz />
      </div>
      <div className="hidden md:flex text-[#ffffff] gap-4 font-notoserif font-light my-auto">
        <a href="#">Events</a>
        <a href="#">My Ticket</a>
        <a href="#">About Project</a>
      </div>
      <div>
        <Button
          variant="outline"
          className="font-notoserif font-light rounded-xl bg-[#ffffff]"
        >
          MY TICKETS →
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;

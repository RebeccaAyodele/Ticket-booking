import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TicketOptions from "./TicketOptions";
import Icon from "@/svg-folder/Icon"
import Subtract from "@/svg-folder/Subtract";

const TicketForm = () => {

    const [currentStep, setCurrentStep] = useState(0);
    const selectedMenu =  ["Ticket Selection", "Attendee Details", "Ready"];

	const sections = [
		{
			step: 1,
			view: (
				<Step1
					setStep={setCurrentStep}
				/>
			),
		},
		{
			step: 2,
			view: (
				<Step2
					setStep={setCurrentStep}
				/>
			),
		},
		{
			step: 3,
			view: (
				<Step3
					setStep={setCurrentStep}
				/>
			),
		},
	]


  return (
    <div className="w-[90%] md:w-[50%] mt-[4%] outline outline-[#0E464F] rounded-3xl outline-1 bg-[#052228]">
      <div className="text-[#ffffff] font-light p-[5%]">
        <div className="flex justify-between">
          <h1 className="font-times text-2xl">{selectedMenu[currentStep]}</h1>
          <p>Step {currentStep + 1}/3</p>
        </div>
        <Progress value={(currentStep + 1) * 33.3} className="mt-[2%]" />
        {sections[currentStep]?.view}
      </div>
     



    </div>
  );
};

export default TicketForm;

const Step1 = ({ setStep }) => {
  return (
    <div className="w-[95%] h-[95%] bg-[#08252B] mx-auto mt-8 rounded-3xl outline outline-[#0E464F] outline-1 p-6">
      <div className="bg-gradient-to-br from-[#07373F] to-[#0A0C11] outline outline-1 outline-[#07373F] text-white text-center rounded-2xl md:p-12 p-6" >
        <div>
          <h1 className="font-road font-bold md:text-5xl text-3xl text py-2">
            Techember Fest "25
          </h1>
          <p>
            Join us for an unforgettable experience at
          </p>
          <p>[Event Name]| Secure your spot now</p>
        </div>
        <div>
          <p>📍 [Event Location] || March 15, 2025 | 7:00 PM</p>
        </div>
      </div>

      <div className="h-[3px] w-[95%] bg-[#07373F] mx-auto m-6"></div>
      <div>
      <p className="mb-4">Select Ticket Type</p>

      <div className="bg-[#052228] outline outline-1 outline-[#07373F] rounded-xl md:w-[100%] w-auto md:h-[142px] h-auto mx-auto p-4">
        <TicketOptions />
      </div>
      <p className="pt-8">Number of Tickets</p>
      <select name="tickets" id="tickets" className="bg-[#08252B] w-[100%] h-12 outline outline-1 outline-[#07373F] rounded-xl p-2 text-sm mt-4 text-white">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      </div>
      
      <div className="mt-8 flex flex-row justify-between gap-x-2">
        <Button className={"w-full bg-[#08252B] border-[#24A0B5] hover:bg-[#24A0B5] hover:text-white font-light text-[#24A0B5] rounded"} variant={"outline"}>
          Cancel
        </Button>
        <Button onClick={() => setStep(1)} className={"w-full text-white font-light bg-[#24A0B5] rounded hover:bg-[#257988]"}>
          Next
        </Button>
      </div>
    </div>
  );
};

const Step2 = ({ setStep }) => {
    return (
        <div className="bg-[#052228] p-6 mt-8 rounded-3xl outline outline-1 outline-[#0E464F]">
            <div className="bg-[#092329ed] h-[265px] outline outline-1 rounded-2xl outline-[#0E464F] py-10">
              <p className="text-xs mb-4 ml-6 font-normal">Upload Profile Photo</p>
              <div className="bg-[#011d23] h-[75%] w-[90%] mx-auto relative">
                <div className="bg-[#0E464F] h-[150%] w-[40%] rounded-xl outline outline-2 outline-[#24A0B5] absolute left-[30%] bottom-[-25%]">
                  <Icon />
                  <p className="p-4 text-sm text-center">Drag and drop or click to upload</p>
                </div>
              </div>
            </div> 
            <div className="h-[2.5px] w-[95%] bg-[#07373F] mx-auto m-8"></div>
            <form>
              <fieldset>
                <legend>Enter your name</legend>
                <input type="text" name="name" id="name" placeholder="Name: " className="bg-[#052228] rounded w-[100%] mb-4 h-10 p-4 outline outline-1 outline-[#0E464F]"/>
                <legend>Enter your email*</legend>
                <input type="email" name="email" id="email" placeholder="johndoe@gmail.com" className="bg-[#052228] rounded w-[100%] mb-4 p-4 h-10 outline outline-1 outline-[#0E464F]" />
                <legend>Special request? </legend>
                <textarea name="request" id="request" cols={80} rows={5} placeholder="Textarea" className="bg-[#052228] rounded w-[100%] mb-4 p-4 outline outline-1 outline-[#0E464F]"></textarea>
              </fieldset>

            </form>
            <div className="mt-6 flex flex-row justify-between gap-x-2">
        <Button onClick={() => setStep(0)} className={"w-full bg-[#08252B] border-[#24A0B5] hover:bg-[#24A0B5] p-2 hover:text-white font-light text-[#24A0B5] rounded"} variant={"outline"}>
          Cancel
        </Button>
        <Button onClick={() => setStep(2)} className={"w-full text-white font-light bg-[#24A0B5] rounded hover:bg-[#257988]"}>
          Next
        </Button>
      </div>       
        </div>
    )
}

const Step3 = ({ setStep }) => {
  return (
    <div className="bg-[#052228] p-6 mt-8 rounded-3xl outline outline-1 outline-[#0E464F] relative top-[-100%]">
      <h1>Your Ticket is Booked</h1>
      <p>Check your email for a copy or you can <strong>download</strong></p>
      <Subtract />
    </div>
  )
}
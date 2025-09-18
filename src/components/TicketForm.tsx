import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import TicketOptions from "./TicketOptions";
import Icon from "@/svg-folder/Icon";
import ticketSvg from "@/svg-folder/Subtract.svg";
import { TicketType } from "./TicketOptions";

const TicketForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const selectedMenu = ["Ticket Selection", "Attendee Details", "Ready"];
  const [ticketType, setTicketType] = useState<TicketType | null>(null);
  const [ticketNumber, setTicketNumber] = useState("1");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [request, setRequest] = useState("");

  return (
    <div className="w-[90%] md:w-[50%] mt-[4%] outline outline-[#197686] rounded-3xl outline-1 bg-[#052228]">
      <div className="text-[#ffffff] font-light p-[5%]">
        <div className="flex justify-between">
          <h1 className="font-times text-2xl">{selectedMenu[currentStep]}</h1>
          <p>Step {currentStep + 1}/3</p>
        </div>
        <Progress value={(currentStep + 1) * 33.3} className="mt-[2%]" />
        {currentStep === 0 && (
          <Step1
            setStep={setCurrentStep}
            ticketType={ticketType}
            setTicketType={setTicketType}
            ticketNumber={ticketNumber}
            setTicketNumber={setTicketNumber}
          />
        )}

        {currentStep === 1 && (
          <Step2
            setStep={setCurrentStep}
            setImageUrl={setImageUrl}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            imageUrl={imageUrl}
            request={request}
            setRequest={setRequest}
          />
        )}

        {currentStep === 2 && (
          <Step3
            setStep={setCurrentStep}
            imageUrl={imageUrl}
            name={name}
            email={email}
            ticketType={ticketType}
            ticketNumber={ticketNumber}
            request={request}
          />
        )}
      </div>
    </div>
  );
};

export default TicketForm;

const Step1 = ({
  setStep,
  ticketType,
  setTicketType,
  ticketNumber,
  setTicketNumber,
}) => {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!ticketType) {
      setError("Please select a ticket type");
      return;
    }
    if (!ticketNumber) {
      setError("Please select number of tickets");
      return;
    }
    setError("");
    setStep(1);
  };
  return (
    <div className="w-[95%] h-[95%] bg-[#08252B] mx-auto mt-8 rounded-3xl outline outline-[#0E464F] outline-1 p-6">
      <div className="bg-gradient-to-br from-[#07373F] to-[#0A0C11] outline outline-1 outline-[#07373F] text-white text-center rounded-2xl md:p-12 p-6">
        <div>
          <h1 className="font-road font-bold md:text-5xl text-3xl text py-2">
            Techember Fest "25
          </h1>
          <p>Join us for an unforgettable experience at</p>
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
          <TicketOptions
            selectedType={ticketType}
            setSelectedType={setTicketType}
          />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}

        <p className="pt-8">Number of Tickets</p>
        <select
          value={ticketNumber}
          onChange={(e) => setTicketNumber(e.target.value)}
          className="bg-[#08252B] w-[100%] h-12 outline outline-1 outline-[#07373F] rounded-xl p-2 text-sm mt-4 text-white"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 flex flex-row justify-between gap-x-2">
        <Button
          className={
            "w-full bg-[#08252B] border-[#24A0B5] hover:bg-[#24A0B5] p-6 hover:text-white font-light text-lg text-[#24A0B5] rounded"
          }
          variant={"outline"}
        >
          Cancel
        </Button>
        <Button
          // onClick={() => setStep(1)}
          onClick={handleNext}
          className={
            "w-full text-white font-light text-lg p-6 bg-[#24A0B5] rounded hover:bg-[#257988]"
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const Step2 = ({
  setStep,
  setImageUrl,
  name,
  setName,
  email,
  setEmail,
  imageUrl,
  request,
  setRequest,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ name: "", email: "", image: "" });

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ticket_booking");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwie74onx/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log("Cloudinary response:", data);
      setImageUrl(data.secure_url); // save URL for next page
      console.log("Uploaded image URL:", data.secure_url);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    const newError = { name: "", email: "", image: "" };
    if (!name) newError.name = "Please enter your name";
    if (!email) newError.email = "Please enter your email";
    if (!imageUrl) newError.image = "Please upload an image";

    setError(newError);

    if (!newError.name && !newError.email && !newError.image) {
      setStep(2);
    }
  };

  return (
    <div className="bg-[#052228] p-6 mt-8 rounded-3xl outline outline-1 outline-[#0E464F]">
      <div className="bg-[#092329ed] md:h-[265px] outline outline-1 rounded-2xl outline-[#0E464F] py-10 pb-10">
        <p className="mb-4 ml-6 font-normal">Upload Profile Photo</p>
        <div className="md:bg-[#011d23] bg-inherit h-[75%] w-[90%] md:flex mx-auto relative">
          <div className="bg-[#0E464F] md:h-[150%] mx-auto md:w-[35%] w-[80%] rounded-xl outline outline-2 outline-[#24A0B5] md:absolute left-[32%] bottom-[-25%]  cursor-pointer hover:bg-[#07373F]">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Uploaded"
                className="h-full w-full object-cover rounded-xl"
              />
            ) : (
              <div onClick={handleClick}>
                <Icon />
                <p className="p-4 text-center">
                  {loading
                    ? "Uploading..."
                    : "Drag and drop or click to upload"}
                </p>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>
        {error.image && (
          <p className="text-red-500 text-center pt-12">{error.image}</p>
        )}
      </div>
      <div className="h-[2.5px] w-[95%] bg-[#07373F] mx-auto m-8"></div>
      <form>
        <fieldset>
          <legend>Enter your name</legend>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name: "
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#052228] rounded w-[100%] mb-4 h-10 p-4 outline outline-1 outline-[#0E464F]"
          />
          {error.name && <p className="text-red-500">{error.name}</p>}
          <legend>Enter your email*</legend>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#052228] rounded w-[100%] mb-4 p-4 h-10 outline outline-1 outline-[#0E464F]"
          />
          {error.email && <p className="text-red-500">{error.email}</p>}
          <legend>Special request? </legend>
          <textarea
            name="request"
            id="request"
            cols={80}
            rows={5}
            placeholder="Textarea"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            className="bg-[#052228] rounded w-[100%] mb-4 p-4 outline outline-1 outline-[#0E464F]"
          ></textarea>
        </fieldset>
      </form>
      <div className="mt-6 flex flex-row justify-between gap-x-2">
        <Button
          onClick={() => setStep(0)}
          className={
            "w-full bg-[#08252B] border-[#24A0B5] hover:bg-[#24A0B5] p-6 hover:text-white font-light text-lg text-[#24A0B5] rounded"
          }
          variant={"outline"}
        >
          Cancel
        </Button>
        <Button
          // onClick={() => setStep(2)}
          onClick={handleNext}
          className={
            "w-full text-white font-light text-lg p-6 bg-[#24A0B5] rounded hover:bg-[#257988]"
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const Step3 = ({
  setStep,
  imageUrl,
  name,
  email,
  ticketType,
  ticketNumber,
  request,
}) => {
  console.log("Step3 received imageUrl:", imageUrl);
  return (
    <div className="p-6 mt-8  h-[80%]">
      <h1 className="text-3xl font-semibold text-center">
        Your Ticket is Booked!
      </h1>
      <p className="text-center my-4">
        Check your email for a copy or you can <strong>download</strong>
      </p>

      <div className="relative overflow-hidden">
        <img
          src={ticketSvg}
          alt="Ticket Background"
          className="w-full h-screen"
        />

        {/* Text on top of it */}
        <div className="h-full absolute inset-0">
          <div
            className="flex flex-col items-center justify-center
               w-[70%] md:w-[50%] mt-4 max-w-full
               text-white p-4 mx-auto"
          >
            <div className=" outline-[#24A0B5] rounded-xl  outline outline-2 h-[70%] p-2 text-center">
              <h1 className="font-road font-bold text-3xl py-2">
                Techember Fest "22
              </h1>
              <p>📍 04 Rumens road, Ikoyi, Lagos</p>
              <p>📅 March 15, 2025 | 7:00 PM</p>
              <div className="w-[200px] h-[200px] mx-auto my-4">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Uploaded Profile"
                    className="object-cover md:w-56 md:h-48 w-36 h-36 rounded-xl outline outline-3 outline-[#24A0B5]"
                  />
                ) : (
                  <p className="text-black text-sm">No image uploaded</p>
                )}
              </div>
              <div className="m-2 bg-[#08343C] rounded-2xl">
                <table className="table-fixed border-collapse border border-[#133D44] w-full text-left rounded-2x">
                  <tbody>
                    <tr>
                      <td className="border border-[#133D44] font-semibold px-2 py-3 w-1/2">
                        <p className="text-white/30 text-sm">Name</p>
                        <span>{name || "N/A"}</span>
                      </td>
                      <td className="border border-[#133D44] font-semibold px-2 py-3 w-1/2">
                        <p className="text-white/30 text-sm">Email</p>
                        <span className=" text-wrap">{email || "N/A"}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-[#133D44] font-semibold px-2 py-3 w-1/2">
                        <p className="text-white/30 text-sm">Ticket for :</p>
                        <span>{ticketNumber || "N/A"}</span>
                      </td>
                      <td className="border border-[#133D44] font-semibold px-2 py-3 w-1/2">
                        <p className="text-white/30 text-sm">Price</p>
                        <span>{ticketType?.price || "N/A"}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="border border-[#133D44] font-semibold px-2 py-3 w-full">
                  <p className="text-white/30 text-sm">Special Request</p>
                  <span className="text-xs">{request || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col items-center justify-center
               h-[15%] mt-7 md:w-[48%] max-w-full
               text-white p-4 mx-auto outline-[#24A0B5] rounded-xl  outline outline-2"
          ></div>
        </div>
      </div>
      <div className="mt-6 flex flex-row justify-between gap-x-2">
        <Button
          onClick={() => setStep(0)}
          className={
            "w-full bg-[#08252B] border-[#24A0B5] hover:bg-[#24A0B5] p-6 hover:text-white font-light text-lg text-[#24A0B5] rounded"
          }
          variant={"outline"}
        >
          Book Another Ticket
        </Button>
        <Button
          onClick={() => setStep(2)}
          className={
            "w-full text-white font-light text-lg p-6 bg-[#24A0B5] rounded hover:bg-[#257988]"
          }
        >
          Download Ticket
        </Button>
      </div>
    </div>
  );
};

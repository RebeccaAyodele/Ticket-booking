export type TicketType = {
  id: number;
  price: string;
  name: string;
};

type TicketOptionsProps = {
  selectedType: TicketType | null;
  setSelectedType: (ticket: TicketType) => void;
};


const TicketOptions: React.FC<TicketOptionsProps> = ({ selectedType, setSelectedType }) => {


	const ticketTypes = [
		{
			id: 1,
			price: "Free",
			name: "REGULAR",
		},
		{
			id: 2,
			price: "$50",
			name: "VIP",
		},
		{
			id: 3,
			price: "$150",
			name: "VVIP",
		}
	]



    return (
        <div>
            <div className="flex flex-col md:flex-row w-full items-center justify-center gap-8">
                {ticketTypes?.map((ticket, i) => (
                    <div
                        key={i}
                        onClick={() => setSelectedType(ticket)}
                        className={`${selectedType?.id === ticket?.id ? "bg-[#12464E]" : ""} border-rounded md:w-[185px] h-[110px] w-full flex aspect-square flex-col justify-center rounded-xl outline outline-3 outline-[#197686] px-2 py-4`}
                    >
                        <p className="text-2xl pb-3 font-bold text-white">{ticket.price}</p>
                        <p className="pb-2 font-normal text-white">{ticket.name} ACCESS</p>
                        <p className="text-xs font-thin text-white">22/10</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TicketOptions
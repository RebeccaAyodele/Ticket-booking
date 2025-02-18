import { useState } from "react"
import { Button } from "@/components/ui/button";


const Demo = () => {
	const [currentStep, setCurrentStep] = useState(0)

	const sections = [
		{
			step: 1,
			view: (
				<Step1
					step={currentStep}
					setStep={setCurrentStep}
				/>
			),
		},
		{
			step: 2,
			view: (
				<Step2
					step={currentStep}
					setStep={setCurrentStep}
				/>
			),
		},
		{
			step: 3,
			view: (
				<Step3
					step={currentStep}
					setStep={setCurrentStep}
				/>
			),
		},
	]

	return (
		<div className={"flex h-screen w-full flex-col items-center justify-center"}>
			<HeaderComponent/>
			<div className="flex h-[80%] w-[60%] flex-col rounded-3xl border border-slate-500 p-8">
				<div className="flex flex-row justify-between">
					<p className={"text-4xl font-bold"}>Ticket Selection</p>
					<p>Step {currentStep + 1} / 3</p>
				</div>


				{sections[currentStep]?.view}
			</div>
		</div>
	)
}

const Step1 = ({ step, setStep }) => {
	return (
		<div className={"flex min-h-[200px] flex-col"}>
			<p>Step 2</p>

			<div className="mt-[10vh] flex flex-row justify-between gap-x-2">
				<Button
					className={"w-full"}
					variant={"outline"}>
					Cancel
				</Button>
				<Button
					onClick={() => setStep(1)}
					className={"w-full"}>
					Next
				</Button>
			</div>
		</div>
	)
}

const Step2 = ({ step, setStep }) => {
	return (
		<div className={"flex min-h-[200px] flex-col"}>
			<p>Step 2</p>

			<div className="mt-[10vh] flex flex-row justify-between gap-x-2">
				<Button
					onClick={() => setStep(0)}
					className={"w-full"}
					variant={"outline"}>
					Previous
				</Button>
				<Button
					onClick={() => setStep(2)}
					className={"w-full"}>
					Next
				</Button>
			</div>
		</div>
	)
}

const Step3 = ({ step, setStep }) => {
	return (
		<div className={"flex min-h-[200px] flex-col"}>
			<p>Step 3</p>

			<div className="mt-[10vh] flex flex-row justify-between gap-x-2">
				<Button
					className={"w-full"}
					variant={"outline"}>
					Download
				</Button>
				<Button
					onClick={() => setStep(0)}
					className={"w-full"}>
					Create Another
				</Button>
			</div>
		</div>
	)
}

export default Demo


const HeaderComponent = () => {
	return <div className={"w-[90%] bg-blue-500 rounded-3xl h-[10vh] mb-8"}></div>
}


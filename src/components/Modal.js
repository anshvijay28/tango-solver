import React from "react";

export default function Modal({ showModal, setShowModal }) {
	return (
		<>
			{showModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-auto my-6 mx-auto max-w-md">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-700 outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between px-5 py-3 border-b border-solid border-blueGray-200 rounded-t text-gray-400">
									<h3 className="text-md font-semibold">Unsolveable Board!</h3>
								</div>
								{/*footer*/}
								<div className="flex items-center justify-center px-4 py-3 border-t border-solid border-blueGray-200 rounded-b">
									<button
										className="bg-red-500 hover:bg-red-700 font-bold py-1 px-4 rounded text-black-400"
										type="button"
										onClick={() => setShowModal(false)}
									>
										<h3 className="text-md font-semibold">Okay</h3>
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>
	);
}
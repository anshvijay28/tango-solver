function LoadingScreen() {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
				<div
					className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
					role="status"
				>
					<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
				</div>

				<p className="mt-3 text-sm font-medium text-black-600">Loading...</p>
			</div>
		</div>
	);
}

export default LoadingScreen;

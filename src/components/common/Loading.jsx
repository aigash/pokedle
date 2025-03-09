export default function Loading() {
    return <div id='loading' className='w-full h-full flex justify-center items-center'>
                <div className='relative'>
                    <img className='absolute top-[15px] w-[120px] left[34%]' src="src/assets/loading.gif" alt="Chargement en cours..." />
                    <img src='src/assets/psykokwak.png' alt="Chargement en cours..." />
                </div>
            </div>;
}
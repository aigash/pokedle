import loadingGif from '../../assets/loading.gif';
import psykokwakImage from '../../assets/psykokwak.png';

export default function Loading() {
    return (
        <div id='loading' className='w-full h-full flex justify-center items-center'>
            <div className='relative'>
                <img className='absolute top-[15px] w-[120px] left[34%]' src={ loadingGif } alt="Chargement en cours..." />
                <img src={ psykokwakImage } alt="Chargement en cours..." />
            </div>
        </div>
    );
}
export default function GameMode({ img, titre, onclick }) {
    return <div className='p-3 rounded-xl flex items-center relative gap-6 hover:bg-[#EBC008] cursor-pointer w-[450px] h-[100px] group' onClick={onclick}>
        <img className='h-full rounded-md' src={img} alt={titre} />
        <h3 className='text-[#305380] font-semibold text-2xl'>{titre}</h3>
        <img className='absolute left-[-30px] hidden group-hover:block' src='src/assets/img/icones/curseur.png' alt='curseur' />
    </div>
}
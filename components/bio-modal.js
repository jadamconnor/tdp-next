
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/pro-solid-svg-icons'

export default function BioModal({onClose, content}) {

    return (
        <div className='fixed flex items-center justify-center w-screen min-h-screen max-h-fit bg-black/50 z-50'>
            <div className='relative text-xl text-smart-blue bg-white m-6 p-8 w-full sm:w-[500px] lg:w-3/4 rounded-xl'>
                <FontAwesomeIcon icon={faTimes}
                    className='cursor-pointer absolute top-4 right-4'
                    onClick={onClose}
                />
                <div className='font-serif text-justice-blue text-xl mb-1 tracking-wider font-bold'>
                    {content.name}
                </div>
                <div className='font-semibold text-base md:text-lg mb-5'>
                    {content.title}
                </div>
                <div className='modal' dangerouslySetInnerHTML={{__html: content.bio}}>
                </div>
            </div>
        </div>
    )
}
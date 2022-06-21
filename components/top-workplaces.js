import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/pro-solid-svg-icons'

export default function TopWorkplaces({onDismiss}) {
    return (
        <div className='bg-justice-blue bg-[url("/Spotlogo2.png")] hidden lg:block  rounded-lg px-6 bg-blend-soft-light bg-[length:200px_300px] bg-[left_20rem_top_2rem] bg-no-repeat'>
            <FontAwesomeIcon icon={faTimes}
                    className='cursor-pointer text-white absolute top-4 right-4'
                    onClick={onDismiss}
            />
            <div className='text-black flex gap-x-6'>
                <div className='bg-yellow-500'>
                    <div className='text-center'>
                        <div className='font-bold text-3xl leading-7 tracking-wider mt-8'>
                            TOP
                        </div>
                        <div className='text-xl leading-5 tracking-wider'>
                            WORK
                        </div>
                        <div className='leading-5 tracking-wider underline underline-offset-4 pb-[2px]'>
                            PLACES
                        </div>
                        <div className='text-xl font-extrabold tracking-widest leading-5'>
                            2022
                        </div>
                    </div>
                    <div className='bg-yellow-500'>
                        <div className='w-[103px] overflow-hidden inline-block -mb-[7px]'>
                            <div className='h-[98px] w-[120px] bg-sirona-green -rotate-45 transform origin-bottom-right bg-justice-blue'></div>
                        </div>
                    </div>
                </div>
                <div className='w-[400px] h-fit text-white mt-8'>
                    <div className='font-extralight text-3xl'>
                        We have been selected as a
                    </div>
                    <div className='font-bold text-4xl mb-3'>
                        Top Workplace for 2022
                    </div>
                    <div className='text-xs'>
                        We are humbled by the glowing reviews from our staff and we are so grateful to work with all of our dedicated & passionate colleagues. We are committed to our continued growth to ensure we remain a Top Workplace for years to come.
                    </div>
                </div>
            </div>
        </div>
    )
}
import Link from 'next/link'

export default function Openings({ openings, onAddChip }) {
    return (
        <div className='container'>
            {openings.map((el) => (
                <div className='border-b border-b-neutral-400' key={el.id}>
                    <div className='flex flex-wrap justify-between py-12' key={el.id}>
                        <div className='w-1/2'>
                            <Link href={`/careers/${el.slug}`}>
                                <a>
                                    <div className='text-justice-blue text-xl font-serif font-light mb-5'>
                                        {el.openingFields.jobTitle}
                                    </div>
                                </a>
                            </Link>
                            <div className='text-justice-stone text-base font-semibold mb-3'>
                                Position Summary:
                            </div>
                            <div className='text-justice-stone unreset' dangerouslySetInnerHTML={{__html: el.openingFields.positionSummary}}/>
                        </div>
                        <div className='grid grid-cols-4 gap-y-1 bg-stone-100 rounded-xl p-5 w-96 h-fit'>
                            <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                                Salary:
                            </div>
                            <div className='col-span-3 text-justice-stone text-sm'>
                                {el.openingFields.salary}
                            </div>
                            <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                                Deadline:
                            </div>
                            <div className='col-span-3 text-justice-stone text-sm'>
                                {el.openingFields.applicationDeadline}
                            </div>
                            <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                                Agency:
                            </div>
                            <div className='col-span-3 text-justice-stone text-sm'>
                                {el.openingFields.agency}
                            </div>
                            <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                                Program:
                            </div>
                            <div className='col-span-3 text-justice-blue text-sm cursor-pointer'>
                                {el.openingFields.programTypes.map((e, index) => (
                                    <div onClick={() => onAddChip(e.programType)} key={Object.keys(e)}>
                                        {index !== el.openingFields.programTypes.length - 1 ?
                                            <span>{e.programType}, </span>
                                        :
                                            <span>{e.programType}</span>
                                        }
                                    </div>
                                ))}
                            </div>
                            <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                                Location:
                            </div>
                            <div className='col-span-3 text-justice-blue text-sm cursor-pointer'>
                                {el.openingFields.location.map((e, index) => (
                                    <div onClick={() => onAddChip(e.location)} key={Object.keys(e)}>
                                        {index !== el.openingFields.location.length - 1 ?
                                            <span>{e.location}, </span>
                                        :
                                            <span>{e.location}</span>
                                        }
                                    </div>
                                ))}
                            </div>
                            <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                                Terms:
                            </div>
                            <div className='col-span-3 text-justice-stone text-sm'>
                                {el.openingFields.positionTerms}
                            </div>
                        </div>
                    </div>
                    <div className='flex mb-8'>
                        <Link href={`/careers/${el.slug}`}>
                            <a>
                                <div className='bg-justice-blue text-white text-sm font-bold rounded-lg p-3 tracking-wider mr-6'>
                                    LEARN MORE
                                </div>
                            </a>
                        </Link>
                        <Link href={`/apply/${el.slug}`}>
                            <a>
                                <div className='bg-justice-blue text-white text-sm font-bold rounded-lg p-3 tracking-wider'>
                                    APPLY
                                </div>
                            </a>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}
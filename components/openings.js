import Link from 'next/link'

export default function Openings({ openings, onAddChip }) {
    return (
        <div className='container px-6  xl:px-20 2xl:px-0 mb-12'>
            {openings.map((el) => (
                <div className='border-b border-b-neutral-400' key={el.id}>
                    <div className='flex flex-wrap justify-between pt-12 mb-3' key={el.id}>
                        <div className='w-full lg:w-1/2'>
                                {el.openingFields.agency === 'The Difference Principle' &&
                                    <Link href={`/careers/${el.slug}`}>
                                        <a>
                                            <div className='text-justice-blue text-xl font-serif font-light mb-5'>
                                                {el.title}
                                            </div>
                                        </a>
                                    </Link>
                                }
                                {el.openingFields.agency === 'JusticePoint' &&
                                    <Link href={`/careers/${el.slug}`}>
                                        <a>
                                            <div className='text-justice-orange text-xl font-serif font-light mb-5'>
                                                {el.title}
                                            </div>
                                        </a>
                                    </Link>
                                }
                                {el.openingFields.agency === 'Sirona Recovery' &&
                                    <Link href={`/careers/${el.slug}`}>
                                        <a>
                                            <div className='text-justice-green text-xl font-serif font-light mb-5'>
                                                {el.title}
                                            </div>
                                        </a>
                                    </Link>
                                }
                            <div className='text-justice-stone text-base font-semibold mb-3'>
                                Position Summary:
                            </div>
                            <div className='text-justice-stone unreset' dangerouslySetInnerHTML={{__html: el.openingFields.positionSummary}}/>
                        </div>
                        <div className='w-full md:w-96'>
                            <div className='grid grid-cols-4 gap-y-1 bg-stone-100 rounded-xl p-5 w-96 h-fit mb-3'>
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
                                    {el.openingFields.applicationDeadline ?
                                        el.openingFields.applicationDeadline
                                    :
                                        'Until Filled'
                                    }
                                </div>
                                <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                                    Agency:
                                </div>
                                {el.openingFields.agency === 'The Difference Principle' &&
                                    <div className='col-span-3 text-justice-blue text-sm'>
                                        {el.openingFields.agency}
                                    </div>
                                }
                                {el.openingFields.agency === 'JusticePoint' &&
                                    <div className='col-span-3 text-justice-orange text-sm'>
                                        {el.openingFields.agency}
                                    </div>
                                }
                                {el.openingFields.agency === 'Sirona Recovery' &&
                                    <div className='col-span-3 text-justice-green text-sm'>
                                        {el.openingFields.agency}
                                    </div>
                                }
                                <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                                    Program:
                                </div>
                                {el.openingFields.agency === 'The Difference Principle' &&
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
                                }
                                {el.openingFields.agency === 'JusticePoint' &&
                                    <div className='col-span-3 text-justice-orange text-sm cursor-pointer'>
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
                                }
                                {el.openingFields.agency === 'Sirona Recovery' &&
                                    <div className='col-span-3 text-justice-green text-sm cursor-pointer'>
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
                                }
                                <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                                    Location:
                                </div>
                                {el.openingFields.agency === 'The Difference Principle' &&
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
                                }
                                {el.openingFields.agency === 'JusticePoint' &&
                                    <div className='col-span-3 text-justice-orange text-sm cursor-pointer'>
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
                                }
                                {el.openingFields.agency === 'Sirona Recovery' &&
                                    <div className='col-span-3 text-justice-green text-sm cursor-pointer'>
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
                                }
                                <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                                    Terms:
                                </div>
                                <div className='col-span-3 text-justice-stone text-sm'>
                                    {el.openingFields.positionTerms}
                                </div>
                            </div>
                            {el.openingFields.positionTerms.search(/full-time/i) !== -1 &&
                            <>
                                {el.openingFields.agency === 'JusticePoint' &&
                                    <a href={`/JP2022Benefits_v4.pdf`} target="_blank" rel="noreferrer">
                                        <div className='bg-stone-700 text-white text-small font-semibold rounded-lg p-3 text-center'>
                                            DOWNLOAD OUR 2022 BENEFITS SUMMARY
                                        </div>
                                    </a>
                                }
                                {el.openingFields.agency === 'Sirona Recovery' &&
                                    <a href={`/SR2022Benefits_v4.pdf`} target="_blank" rel="noreferrer">
                                        <div className='bg-stone-700 text-white text-small font-semibold rounded-lg p-3 text-center'>
                                            DOWNLOAD OUR 2022 BENEFITS SUMMARY
                                        </div>
                                    </a>
                                }
                            </>
                            }
                        </div>
                    </div>
                    <div className='flex mb-5'>
                        {el.openingFields.agency === 'The Difference Principle' &&
                            <Link href={`/careers/${el.slug}`}>
                                <a>
                                    <div className='bg-justice-blue text-white text-sm font-bold rounded-lg p-3 tracking-wider mr-6'>
                                        LEARN MORE
                                    </div>
                                </a>
                            </Link>
                        }
                        {el.openingFields.agency === 'JusticePoint' &&
                            <Link href={`/careers/${el.slug}`}>
                                <a>
                                    <div className='bg-justice-orange text-white text-sm font-bold rounded-lg p-3 tracking-wider mr-6'>
                                        LEARN MORE
                                    </div>
                                </a>
                            </Link>
                        }
                        {el.openingFields.agency === 'Sirona Recovery' &&
                            <Link href={`/careers/${el.slug}`}>
                                <a>
                                    <div className='bg-justice-green text-white text-sm font-bold rounded-lg p-3 tracking-wider mr-6'>
                                        LEARN MORE
                                    </div>
                                </a>
                            </Link>
                        }
                        {el.openingFields.agency === 'The Difference Principle' &&
                            <Link href={`/apply/${el.slug}`}>
                                <a>
                                    <div className='bg-justice-blue text-white text-sm font-bold rounded-lg p-3 tracking-wider mb-3'>
                                        APPLY
                                    </div>
                                </a>
                            </Link>
                        }
                        {el.openingFields.agency === 'JusticePoint' &&
                            <Link href={`/apply/${el.slug}`}>
                                <a>
                                    <div className='bg-justice-orange text-white text-sm font-bold rounded-lg p-3 tracking-wider mb-3'>
                                        APPLY
                                    </div>
                                </a>
                            </Link>
                        }
                        {el.openingFields.agency === 'Sirona Recovery' &&
                            <Link href={`/apply/${el.slug}`}>
                                <a>
                                    <div className='bg-justice-green text-white text-sm font-bold rounded-lg p-3 tracking-wider mb-3'>
                                        APPLY
                                    </div>
                                </a>
                            </Link>
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}
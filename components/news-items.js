import Link from 'next/link'

export default function NewsItems({ newsItems, onAddChip }) {
    return (
        <div className='container px-6  xl:px-20 2xl:px-0 mb-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 -mx-5'>
                {newsItems.map((item) => (
                    <div className='col-span-1 hover:bg-stone-100 p-5 rounded-xl' key={item.node.newsItemFields.title}>
                        <div className='font-serif text-2xl text-justice-blue mb-3'>
                            {!item.node.newsItemFields.external ?
                                <Link href={`/news/${item.node.newsItemFields.url}`}>
                                    <a>
                                        {item.node.newsItemFields.title}
                                    </a>
                                </Link>
                            :
                                <a href={item.node.newsItemFields.url} target='_blank' rel='noreferrer'>
                                    {item.node.newsItemFields.title}
                                </a>
                            }
                        </div>
                        <div className='font-sans mb-4'>
                            {item.node.newsItemFields.blurb}
                        </div>
                        <div className='font-sans italic'>
                            {item.node.newsItemFields.author}
                        </div>
                        <div className='font-sans mb-3'>
                            {item.node.newsItemFields.published}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
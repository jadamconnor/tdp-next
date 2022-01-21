import Link from 'next/link'

export default function NewsItems({ newsItems, onAddChip }) {
    return (
        <div className='container px-6 lg:px-0 mb-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 -mx-5'>
                {newsItems.map((item) => (
                    <div className='grid-span-1 hover:bg-stone-100 p-5 rounded-xl' key={item.node.id}>
                        <div className='font-serif text-2xl text-justice-blue mb-3'>
                            <Link href={`/news/${item.node.slug}`}>
                                <a>
                                    {item.node.newsItemFields.title}
                                </a>
                            </Link>
                        </div>
                        <div className='font-sans text-lg mb-4'>
                            {item.node.newsItemFields.blurb}
                        </div>
                        <div className='font-sans text-lg italic'>
                            {item.node.newsItemFields.author}
                        </div>
                        <div className='font-sans text-lg mb-3'>
                            {item.node.newsItemFields.published}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
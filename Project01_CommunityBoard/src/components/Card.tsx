interface CardProps {
    img: string,
    projectTitle: string,
    projectDescription: string,
    projectCategory: string
}

const Card = (props: CardProps) => {
    return (
        <div className="card flex flex-col bg-white rounded-xl shadow-md overflow-hidden h-full">
            <img 
                src={props.img} 
                alt="Card image" 
                className="w-full h-48 object-cover flex-shrink-0"
            />
            <div className="flex flex-col flex-1 p-4 gap-2">
                <h3 className="text-lg font-bold leading-tight line-clamp-2">
                    {props.projectTitle}
                </h3>
                <p className="text-gray-600 text-sm leading-snug flex-1 line-clamp-3">
                    {props.projectDescription}
                </p>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs w-fit mt-auto">
                    {props.projectCategory}
                </span>
            </div>
        </div>
    )
}

export default Card
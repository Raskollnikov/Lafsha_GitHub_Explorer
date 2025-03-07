
const SortRepos = ({onSort,sortType}) => {
	const buttonArray=[
		{type:'recent',text:"Most Recent"},
		{type:'stars',text:"Most Stars"},
		{type:'forks',text:"Most Forks"}
	]
	return (
		<div className='mb-2 flex justify-center lg:justify-end'>
			{buttonArray.map(each=>(
				<button key={each.type} type='button' className={`py-2.5 px-5 me-2 mb-2  text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass
					${sortType===each.type?"border-blue-500":""}`}
					onClick={()=>onSort(each.type)}>
						{each.text}
				</button>
			))}
		</div>
	);
};

export default SortRepos
import React, { useState } from 'react';

const Todo = () => {
	const [item, setItem] = useState('');
	const [itemList, setItemList] = useState([]);

	const handleChange = e => {
		setItem(e.target.value);
	};

	const handleAdd = () => {
		if (item !== '') {
			setItemList(prevItems => [...prevItems, { item, isDone: false }]);
			setItem('');
		}
	};

	const handleItemClass = index => {
		const done = itemList.map(el => {
			if (el === itemList[index]) {
				el.isDone = !el.isDone;
			}
			return el;
		});
		setItemList(done);
	};
	console.log(itemList);

	return (
		<>
			<div>
				<input type='text' onChange={handleChange} value={item} />
				<button onClick={handleAdd}>Add</button>
			</div>
			<p>
				{itemList.filter(el => el.isDone).length} completed from{' '}
				{itemList.length}
			</p>
			<ul>
				{itemList.map((itemCurrent, i) => (
					<li
						key={i}
						onClick={() => handleItemClass(i)}
						className={itemCurrent.isDone ? 'isDone' : ''}
					>
						{itemCurrent.item}
					</li>
				))}
			</ul>
		</>
	);
};

export default Todo;

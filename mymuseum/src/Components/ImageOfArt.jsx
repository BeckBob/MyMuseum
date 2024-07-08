

const ImageOfArt = ({ item }) => {
	const { title, primaryImageSmall } = item;
	console.log(item)
	return (
		<div className="item-image-card">
			<img alt={title} title={title} src={primaryImageSmall} className="items-img"  />
		</div>
	);
};
export default ImageOfArt;
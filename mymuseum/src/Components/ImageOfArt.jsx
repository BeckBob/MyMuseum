const ImageOfArt = ( item ) => {
	
	return (
		<div className="item-image-card">
			<img src={item.primaryImage} className="items-img" />
		</div>
	);
};
export default ImageOfArt;
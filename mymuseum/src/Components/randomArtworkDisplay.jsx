import {useState, useEffect } from "react";
import { getAmountOfArtInMetAPI, getItemById} from "./utils";
import ImageOfArt from "./ImageOfArt";

import { getRandomInt } from "./getRandomInt";



const RandomArtworkDisplay = () => {


	const [items, setItem] = useState([]);
	const [isLoading, setIsLoading] = useState(false)


	useEffect(() => {
		setIsLoading(true)
		let amount = getAmountOfArtInMetAPI()

		let idNumber = 0;
		idNumber = getRandomInt(amount);
		getItemById(10).then(({ item }) => {
			setItem(item);
		})
		setIsLoading(false)
	}, []);

	
		








		if (isLoading) {
			return (<section className="loading-screen">results are loading</section>)
		}
		else {
			return (
				<section className="Picture-container grid">
					<div className="item-image-card">
						<img className="items-img" src={{ items }.primaryImage} />
					</div>
				</section>
			);
		}

	}
;
	

	

export default RandomArtworkDisplay;
import {useState, useEffect } from "react";
import { getAmountOfArtInMetAPI, getItemById} from "./utils";
import ImageOfArt from "./ImageOfArt";

import { getRandomInt } from "./getRandomInt";



const RandomArtworkDisplay = () => {


	const [items, setItem] = useState({});
	const [isLoading, setIsLoading] = useState(false)


	useEffect(() => {
		setIsLoading(true)
		let amount = getAmountOfArtInMetAPI()

		let randomNumber = 0;
		//idNumber = getRandomInt(amount);
		randomNumber = Math.floor(Math.random() * amount);
		
		console.log(randomNumber)

		getItemById(1567).then((item) => {
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
					<ImageOfArt key={items.item_id} item={items}/>				</section>
			);
		}

	}
;
	

	

export default RandomArtworkDisplay;
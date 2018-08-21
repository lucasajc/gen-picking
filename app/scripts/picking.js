const PALLET = 'PALLET';
const BEGIN = 'BEGIN';
const END = 'END';
const PASSAGE = 'PASSAGE';

class Node{
	constructor(productId,posX,posY,brickType){
		this.productId = productId;
		this.posX = posX;
		this.posY = posY;
		this.brickType = brickType;
	}
}

class Picking{
	constructor(mapping){
		this.mapping = mapping;
		this.distMatrix = this.getDistMatrix();
	}

	getDistMatrix(){
		let distMatrix = [];

		for(let i=0;i<this.mapping.length;i++){
			distMatrix[i]=[];
			for(let j=0;j<this.mapping.length;j++){
				distMatrix[i][j] = Math.sqrt((Math.pow(this.mapping[i].posX-this.mapping[j].posX,2))+(Math.pow(this.mapping[i].posY-this.mapping[j].posY,2)));
			}
		}
		return distMatrix;
	}

	calcTotalDistance(loadingQueue){
		let distance = 0;
		let position;
		let finalPosition;

		for(let i=0;i<this.mapping.length;i++){
			if(this.mapping[i].brickType==BEGIN){
				position = i;
			}
		}

		for(let i=0;i<this.mapping.length;i++){
			if(this.mapping[i].brickType==END){
				finalPosition = i;
			}
		}

		loadingQueue.forEach(product=>{
			let nearestDistance = Number.MAX_VALUE;
			let nearestPosition = 0;

			for(let i=0;i<this.mapping.length;i++){
				if((product == this.mapping[i].productId)&&(this.distMatrix[position][i] < nearestDistance)){					
					nearestDistance = this.distMatrix[position][i];
					nearestPosition = i;
				}
			}

			position = nearestPosition;

			distance += nearestDistance;
		});

		distance += this.distMatrix[position][finalPosition];

		return distance;
	}

}
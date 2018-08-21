let mapping = [];
let display = document.getElementById('main');
let foBanner = document.getElementById('foBanner');
let picking;
let loadingQueue = [];

const skuSize = [
	{type:'BC 600',qtd:3},
	{type:'SK 600',qtd:2},
	{type:'GCA 2L',qtd:3},
	{type:'PEP 2L',qtd:2}
]

window.onload = function(){
	
	buildQueue();
	picking = gen.run();
	foBanner.innerHTML = 'Best F.O.: '+picking.calcTotalDistance(loadingQueue).toFixed(2);
	buildDisplay();
}

function buildDisplay(){
	picking.mapping.forEach(item=>{
		if(item.brickType === PALLET){
			display.innerHTML += '<div class="unit"><h1>'+item.productId+'</h1></div>';
		}
		else if(item.brickType === PASSAGE){
			display.innerHTML += '<div class="blank-unit"><h1>null</h1></div>';
		}
		else if(item.brickType === BEGIN){
			display.innerHTML += ' <div class="begin-unit"><h1>null</h1></div>';
		}
		else if(item.brickType === END){
			display.innerHTML += ' <div class="end-unit"><h1>null</h1></div>';
		}
		else{
			display.innerHTML += '<div class="blank-unit"><h1>null</h1></div>';
		}
	});
}

function buildRandomMapping(){

	let skuQtd = skuSize;
	let randomPosition = 0;
	let mapping = [];

	mapping.push(new Node(null,0,0,PASSAGE));
	mapping.push(new Node(null,0,1,PALLET));
	mapping.push(new Node(null,0,2,PALLET));
	mapping.push(new Node(null,0,3,PALLET));
	mapping.push(new Node(null,0,4,PALLET));
	mapping.push(new Node(null,0,5,PALLET));
	mapping.push(new Node(null,0,6,PASSAGE));
	mapping.push(new Node(null,1,0,BEGIN));
	mapping.push(new Node(null,1,1,PASSAGE));
	mapping.push(new Node(null,1,2,PASSAGE));
	mapping.push(new Node(null,1,3,PASSAGE));
	mapping.push(new Node(null,1,4,PASSAGE));
	mapping.push(new Node(null,1,5,PASSAGE));
	mapping.push(new Node(null,1,6,END));
	mapping.push(new Node(null,2,0,PASSAGE));
	mapping.push(new Node(null,2,1,PALLET));
	mapping.push(new Node(null,2,2,PALLET));
	mapping.push(new Node(null,2,3,PALLET));
	mapping.push(new Node(null,2,4,PALLET));
	mapping.push(new Node(null,2,5,PALLET));
	mapping.push(new Node(null,2,6,PASSAGE));



	skuQtd.forEach(item=>{
		for(let i=item.qtd;i>0;i--){

			randomPosition = Math.trunc(Math.floor((Math.random()*mapping.length)+0));

			while(((mapping[randomPosition].brickType == PALLET)&&(mapping[randomPosition].productId!=null))||((mapping[randomPosition].brickType != PALLET)&&(mapping[randomPosition].productId==null))){
				randomPosition = Math.trunc(Math.floor((Math.random()*mapping.length)+0));
			}

			if(mapping[randomPosition].productId==null){
				mapping[randomPosition].productId = item.type;
			}
			
		}
	});
	

	return new Picking(mapping);

}

function buildMapping(){
	mapping.push(new Node(null,0,0,PASSAGE));
	mapping.push(new Node('BC 600',0,1,PALLET));
	mapping.push(new Node('BC 600',0,2,PALLET));
	mapping.push(new Node('BC 600',0,3,PALLET));
	mapping.push(new Node('SK 600',0,4,PALLET));
	mapping.push(new Node('SK 600',0,5,PALLET));
	mapping.push(new Node(null,0,6,PASSAGE));
	mapping.push(new Node(null,1,0,BEGIN));
	mapping.push(new Node(null,1,1,PASSAGE));
	mapping.push(new Node(null,1,2,PASSAGE));
	mapping.push(new Node(null,1,3,PASSAGE));
	mapping.push(new Node(null,1,4,PASSAGE));
	mapping.push(new Node(null,1,5,PASSAGE));
	mapping.push(new Node(null,1,6,END));
	mapping.push(new Node(null,2,0,PASSAGE));
	mapping.push(new Node('GCA 2L',2,1,PALLET));
	mapping.push(new Node('GCA 2L',2,2,PALLET));
	mapping.push(new Node('GCA 2L',2,3,PALLET));
	mapping.push(new Node('PEP 2L',2,4,PALLET));
	mapping.push(new Node('PEP 2L',2,5,PALLET));
	mapping.push(new Node(null,2,6,PASSAGE));

	picking = new Picking(mapping);

}

function buildQueue(){
	loadingQueue.push('BC 600');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('BC 600');
	loadingQueue.push('BC 600');
	loadingQueue.push('SK 600');
	loadingQueue.push('BC 600');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('BC 600');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('BC 600');
	loadingQueue.push('BC 600');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('SK 600');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('BC 600');
	loadingQueue.push('SK 600');
	loadingQueue.push('SK 600');
	loadingQueue.push('SK 600');
	loadingQueue.push('BC 600');
	loadingQueue.push('SK 600');
	loadingQueue.push('SK 600');
	loadingQueue.push('SK 600');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('BC 600');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('SK 600');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('SK 600');
	loadingQueue.push('SK 600');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('SK 600');
	loadingQueue.push('BC 600');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('BC 600');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('SK 600');
	loadingQueue.push('BC 600');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('SK 600');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('SK 600');
	loadingQueue.push('SK 600');
	loadingQueue.push('SK 600');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('BC 600');
	loadingQueue.push('SK 600');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('BC 600');
	loadingQueue.push('SK 600');
	loadingQueue.push('BC 600');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('SK 600');
	loadingQueue.push('BC 600');
	loadingQueue.push('SK 600');
	loadingQueue.push('BC 600');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('SK 600');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('SK 600');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('SK 600');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('SK 600');
	loadingQueue.push('GCA 2L');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('PEP 2L');
	loadingQueue.push('BC 600');
	loadingQueue.push('PEP 2L');
}

const populationSize = 10;
const mutationProbability = 1;
const objective = 100;
const maxGerations = 500;

var population  = [];


var gen =
{
	init:function()
	{
		for(let i=0;i<populationSize;i++){
			population.push(buildRandomMapping());
		}
	},
	selectionElitism:function( population )
	{
		let mostAbleSurvive;
		let remainingIndividuals = [];
		let selectedIndividuals = [];
		let fos = [];
		let lowerFO = Number.MAX_VALUE;
		let selection = [];

		//Select the individual most able to survive 
		population.forEach(individual=>{
			let fo = individual.calcTotalDistance(loadingQueue);
			
			
			if(fo < lowerFO){
				lowerFO = fo;
				mostAbleSurvive = individual;
			}
		});

		//Select the remaining individuals
		population.forEach(individual=>{
			if(individual !== mostAbleSurvive){
				remainingIndividuals.push(individual);
				fos.push(individual.calcTotalDistance(loadingQueue));
				
			}
		});

		fos.sort();
		console.log(fos);
		if(remainingIndividuals.length>(populationSize-1)){

			for(let i=0;i<remainingIndividuals.length;i++){
				let fo = remainingIndividuals[i].calcTotalDistance(loadingQueue);
				if((fo<=fos[populationSize-1])&&(selectedIndividuals.length<=populationSize-2)){
					selectedIndividuals.push(remainingIndividuals[i]);
				}
			}
		}
		else{
			selectedIndividuals = remainingIndividuals;
		}

		selection.push(mostAbleSurvive);
		selection.push(selectedIndividuals);
		return selection;
	}, 
	crossover:function(alpha, population)
	{
		let newPopulation = [];
		

	
		population.forEach(individual=>{

			let mapping1 = [];
			let mapping2 = [];

			for(let i=0;i<individual.mapping.length;i++){

				if((individual.mapping[i].brickType === PALLET)&&(i<(individual.mapping.length/2))){
					mapping1.push(new Node(alpha.mapping[i].productId,alpha.mapping[i].posX,alpha.mapping[i].posY,alpha.mapping[i].brickType));
					mapping2.push(individual.mapping[i]);
				}
				else if((individual.mapping[i].brickType === PALLET)&&(i>=(individual.mapping.length/2))){
					mapping1.push(individual.mapping[i]);
					mapping2.push(new Node(alpha.mapping[i].productId,alpha.mapping[i].posX,alpha.mapping[i].posY,alpha.mapping[i].brickType));
					
				}
				else{
					mapping1.push(individual.mapping[i]);
					mapping2.push(individual.mapping[i]);
				}
			}
			newPopulation.push(new Picking(mapping1));
			newPopulation.push(new Picking(mapping2));
			
		});
		return newPopulation;
	},
	mutation:function( population )
	{

		population.forEach(individual=>{
			let randomNumber = Math.trunc(Math.floor((Math.random()*100)+0));
			if(randomNumber===mutationProbability){
				individual = buildRandomMapping();
			}
		});

		return population;

	},
	test:function( alpha )
	{
		if(alpha.calcTotalDistance(loadingQueue) <= objective){
			return true;
		}
		else{
			return false;
		}
	},
	run:function()
	{
		let selection = [];
		let lowerFO = Number.MAX_VALUE;
		let bestIndividual;

		this.init();
		for(let i=0;i<maxGerations;i++){
			console.log('I: '+i);
			selection = this.selectionElitism(population);
			console.log(selection);
			population = this.crossover(selection[0],selection[1]);
			console.log(population);
			population = this.mutation(population);
			console.log(population);
			population.forEach(individual=>{
				if(this.test(individual)){
					return individual;
				}
			});

		}

		population.forEach(individual=>{
			let fo = individual.calcTotalDistance(loadingQueue);
			if(fo < lowerFO){
				lowerFO = fo;
				bestIndividual = individual;
			}
		});
		return bestIndividual;
		
	}
}
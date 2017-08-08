#pragma strict
var cardBehaviour: GameObject;
var velocidade : float;
var checkMouse : boolean;
var distanciaCard : Vector3;
var firstCheckD : Vector3;
var tempPosition : Vector3;

function Start ()  {
	velocidade = 2; // ------------------------------------------------------------------- Velocidade da Transição das cartas (movimentação)
	cardBehaviour = GameObject.FindGameObjectWithTag("cardBehaviour"); // ---------------- O Objeto pai da cartas que irão se mover
	deckMachineBehaviour.firstCheckD = cardBehaviour.transform.position; // -------------- Posição inicial das cartas
}

function Update () {
	if(checkMouse == true && Input.GetMouseButton(0)){ // -------------------------------- Condição que dispara o evento
	    moveCard (velocidade, cardBehaviour);
		controlPosition(cardBehaviour);

	}
}

function moveCard (velocidade : float, objectMoved : GameObject) {
		objectMoved.transform.position.x += velocidade * Time.deltaTime; // ------------ Movimentação da carta
}

function controlPosition (objectControl: GameObject) {
	deckMachineBehaviour.distanciaCard = objectControl.transform.position;
					deckMachineBehaviour.distanciaCard.x = deckMachineBehaviour.firstCheckD.x - objectControl.transform.position.x;
			Debug.Log("Na váriavel distanciaCard : " + deckMachineBehaviour.distanciaCard);
			for(var i: int = 0; i < deckMachineBehaviour.currentDeck.length; i++){
				if(deckMachineBehaviour.currentDeck[i]!= null){
					deckMachineBehaviour.tempPosition = deckMachineBehaviour.allPosition[i];
					deckMachineBehaviour.tempPosition.x -= deckMachineBehaviour.distanciaCard.x;
					deckMachineBehaviour.allPosition[i] = deckMachineBehaviour.tempPosition;
					}
			}
		deckMachineBehaviour.tempSpace += deckMachineBehaviour.distanciaCard.x;
			Debug.Log("Na váriavel tempSpace : " + deckMachineBehaviour.tempSpace);
		deckMachineBehaviour.firstCheckD = cardBehaviour.transform.position;
			Debug.Log("Na váriavel firstCheckD : " + deckMachineBehaviour.firstCheckD);

}

function OnTriggerEnter2D(coll: Collider2D){   
		if(coll.gameObject.tag == "mouse"){
		  		checkMouse = true;
		    }
}

function OnTriggerExit2D(coll: Collider2D){   
		if(coll.gameObject.tag == "mouse"){
		  		checkMouse = false;
		    } 
}
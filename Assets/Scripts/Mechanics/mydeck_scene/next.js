﻿#pragma strict
var cardFieldObj: GameObject;
var velocidade : float;
var checkMouse : boolean;
var distanceCard : Vector3;
var tempPosition : Vector3;
var tempSpace : float;
var startPosition : Vector3;
var temp : int;
var controlDeck = new Array(); // Matriz que guarda a posição de todas as cartas

function Start ()  {
	prepareVariablesFromDeckMachine (); // -------------- Posição inicial das cartas
}

function Update () {
	if(checkMouse == true && Input.GetMouseButton(0)){ // -------------------------------- Condição que dispara o evento
	    moveCard (velocidade, cardFieldObj);
		

	}
	if(checkMouse == true && Input.GetMouseButtonUp(0)){ // -------------------------------- Condição que dispara o evento
		controlPosition(cardFieldObj);
	}
}

function moveCard (velocidade : float, objectMoved : GameObject) {
		objectMoved.transform.position.x += velocidade * Time.deltaTime; // ------------ Movimentação da carta
}

function prepareVariablesFromDeckMachine () {
		velocidade = 2; // -------------------------------------------------------------------------- Velocidade da Transição das cartas (movimentação)
		controlDeck.length = 20; // ----------------------------------------------------------------- Posição maxíma que pode receber do array da função "deckMachineBehaviour"
		cardFieldObj = GameObject.FindGameObjectWithTag("cardBehaviour"); // ------------------------ O Objeto pai da cartas que irão se mover
		startPosition = cardFieldObj.GetComponent.<deckMachineBehaviour>().getFirstPosition(); // --- Primeira posição (salva ao instanciar)
		temp = cardFieldObj.GetComponent.<deckMachineBehaviour>().getCurrentDeckLength();
		tempSpace = startPosition.x - cardFieldObj.transform.position.x;

}

function setVariablesFromDeckMachine (functionName : String, value : Object ){
	cardFieldObj.SendMessage(functionName, value);
}

function controlPosition (objectControl: GameObject) { // ------------------------------ Controle da posição da carta
								distanceCard = objectControl.transform.position;
								tempSpace = startPosition.x - distanceCard.x;
					for(var i: int = 0; i < temp; i++){
						if(objectControl.GetComponent.<deckMachineBehaviour>().getInCurrentDeck(i) != null){
								tempPosition = objectControl.GetComponent.<deckMachineBehaviour>().getInAllPosition(i);
								tempPosition.x -= tempSpace;
								var tempStorage : Object[];
								tempStorage = new Object[2];
								tempStorage[0] = i;
								tempStorage[1] = tempPosition;
								setVariablesFromDeckMachine ("setInAllPosition", tempStorage);
							}
					}
				setVariablesFromDeckMachine ("setTempSpace", tempSpace);
				Debug.Log(tempPosition.x);


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
#pragma strict
var cardBehaviour: GameObject;
var velocidade : float;
var checkMouse : boolean;
var distanciaCard : Vector3;
var firstCheckD : Vector3;
var tempPosition : Vector3;

function Start ()  {
	velocidade = 2;
	cardBehaviour = GameObject.FindGameObjectWithTag("cardBehaviour");
}

function Update () {
	if(checkMouse == true && Input.GetMouseButton(0)){
		if(firstCheckD == Vector3(0,0,0)){
			firstCheckD = cardBehaviour.transform.position;

		}
	cardBehaviour.transform.position.x -= velocidade * Time.deltaTime;
	}
	if(checkMouse == true && Input.GetMouseButtonUp(0)){
					distanciaCard = cardBehaviour.transform.position;
					distanciaCard.x = firstCheckD.x - cardBehaviour.transform.position.x;
			for(var i: int = 0; i < deckMachineBehaviour.currentDeck.length; i++){
				if(deckMachineBehaviour.currentDeck[i]!= null){
					tempPosition = deckMachineBehaviour.allPosition[i];
					tempPosition -= distanciaCard;
					deckMachineBehaviour.allPosition[i] = tempPosition;
				}
		}
		firstCheckD = new Vector3(0,0,0);
		deckMachineBehaviour.tempSpace = distanciaCard.x;
	}
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
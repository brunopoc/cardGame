#pragma strict
var cardBehaviour: GameObject;
var velocidade : float;
var checkMouse : boolean;

function Start () {
	velocidade = 5;
	cardBehaviour = GameObject.FindGameObjectWithTag("cardBehaviour");
}

function Update () {
	if(checkMouse == true && Input.GetMouseButton(0)){
	cardBehaviour.transform.position.x += velocidade * Time.deltaTime;
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
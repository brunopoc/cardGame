#pragma strict
var cardBehaviour: GameObject;
var velocidade : float;
function Start () {
	velocidade = 15;
	cardBehaviour = GameObject.FindGameObjectWithTag("cardBehaviour");
}

function Update () {
	
}

function backOnClick(){
cardBehaviour.transform.position.x += velocidade * Time.deltaTime;
}

function nextOnClick(){
cardBehaviour.transform.position.x += -velocidade * Time.deltaTime;
}
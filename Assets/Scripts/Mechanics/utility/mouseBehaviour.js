﻿#pragma strict
static var mouseOnPosition:boolean;
var TheMouse:GameObject;
static var position:GameObject;
var sensibilidade:float;
var newMousePosition:Vector2;
//static var onButtonPositionL: boolean;
//static var onButtonPositionR: boolean;

static var moveCard : GameObject;
static var kingField: boolean;
static var inMove : boolean;
static var inDelete : boolean;

function Start () {
    sensibilidade = 10;
    position = TheMouse;
    position.transform.position = Input.mousePosition ;
    inDelete = false;
    inDelete = false;
    kingField = false;
    // Cursor.visible = false;
}

function Update () {
    var ray: Vector3 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
    newMousePosition.x = ray.x;
    newMousePosition.y = ray.y;
    position.transform.position = newMousePosition;

}




function OnTriggerEnter2D(coll: Collider2D){

    if(coll.gameObject.tag == "card") {
        mouseOnPosition = true;
	        if(moveCard == null) { // Essa verificação é essencial para colidir apenas um card por vez
	        moveCard = coll.gameObject;
	        }
    }

    if(coll.gameObject.tag == "king"){
   	 kingField = true;
    }

    if(coll.gameObject.tag == "firstslot" || coll.gameObject.tag == "lastslot"){
     inMove = true;
    }

    if(coll.gameObject.tag == "removeCard"){
    inDelete = true;
    }

}
    
function OnTriggerExit2D(coll: Collider2D){

        if(coll.gameObject.tag == "card" && coll.gameObject == moveCard){  // O Objeto de colisão precisa ser o mesmo que está salvo no moveCard
            mouseOnPosition = false;
            moveCard = null;
        }

		if(coll.gameObject.tag == "king"){
	    	kingField = false;
	    }

	    if(coll.gameObject.tag == "firstslot" || coll.gameObject.tag == "lastslot"){
		    inMove = false;
		}

		if(coll.gameObject.tag == "removeCard"){
	   		inDelete = false;
	    }

}
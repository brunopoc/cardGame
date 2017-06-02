#pragma strict
var card : GameObject;
var contAmount : int;

function Start () {
	
}

function Update () {
}

function delete_0ne () {
		card = this.transform.parent.gameObject;
		card = card.transform.Find("qtdCard").gameObject;
		card = card.transform.Find("txtQtdCard").gameObject;
		contAmount = int.Parse(card.GetComponent.<UnityEngine.UI.Text>().text);
			if(contAmount > 1){
				contAmount--;
				card.GetComponent.<UnityEngine.UI.Text>().text = contAmount.ToString();
			} else {
					for(var i: int; i < deckMachineBehaviour.currentDeck.length; i++){
						if(card.name + "(Clone)" == deckMachineBehaviour.currentDeck[i]){
								Debug.Log(deckMachineBehaviour.currentDeck[i]);
								deckMachineBehaviour.currentDeck[i] = null;
								Destroy(this.transform.parent.gameObject);
							}
						}
					}
}
function OnTriggerEnter2D(coll: Collider2D){   
		if(coll.gameObject.tag == "mouse"){
		  		baseCardBehaviour.sceneCheck = "freeze";
		    } 
}

function OnTriggerExit2D(coll: Collider2D){   
		if(coll.gameObject.tag == "mouse"){
		  		baseCardBehaviour.sceneCheck = "my_decks";
		    } 
}
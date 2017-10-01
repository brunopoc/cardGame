#pragma strict
var card : GameObject;
var card2: GameObject;
var contAmount : int;

function Start () {
	
}

function Update () {
}

function delete_0ne () {
		card = this.transform.parent.gameObject;
		card2 = card;
		card = card.transform.Find("qtdCard").gameObject;
		card = card.transform.Find("txtQtdCard").gameObject;
		contAmount = int.Parse(card.GetComponent.<UnityEngine.UI.Text>().text);
			if(contAmount > 1){
				contAmount--;
				card.GetComponent.<UnityEngine.UI.Text>().text = contAmount.ToString();
			} else {
					for(var i: int = 0; i < deckMachineBehaviour.currentDeck.length; i++){
						if(card2.name == deckMachineBehaviour.currentDeck[i]){
								deckMachineBehaviour.currentDeck[i] = null;
								deckMachineBehaviour.allPosition[i] = null;
								controlOneScene(i, "my_decks");
								card2.GetComponent.<baseCardBehaviour>().onDeckManager = false;
								i = deckMachineBehaviour.currentDeck.length;
								Destroy(this.transform.parent.gameObject);
								mouseBehaviour.inDelete = false;
							}
						}
					}
}

function controlOneScene(position : int, value : String){
		var temp : GameObject;
		if(deckMachineBehaviour.allPosition[position] != null) {
		temp = deckMachineBehaviour.allPosition[position];
		temp.GetComponent.<baseCardBehaviour>().useSceneCheck ("set", value);
		}
}



function OnTriggerEnter2D(coll: Collider2D){   
		if(coll.gameObject.tag == "card" && coll.gameObject.GetComponent.<baseCardBehaviour>().inMouse == true){
		coll.gameObject.GetComponent.<baseCardBehaviour>().useSceneCheck ("set", "freeze");
		    }
}

function OnTriggerExit2D(coll: Collider2D){   
		if(coll.gameObject.tag == "card" && coll.gameObject.GetComponent.<baseCardBehaviour>().inMouse == false) {
		coll.gameObject.GetComponent.<baseCardBehaviour>().useSceneCheck ("set", "my_decks");
		    } 
}
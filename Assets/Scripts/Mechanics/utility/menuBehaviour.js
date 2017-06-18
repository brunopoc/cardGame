#pragma strict
var newScene:UnityEngine.SceneManagement.SceneManager; //Variável para a troca de cenas
var deckToSave : String[];
var cardToSave : String;
var qtdNum : int;
var cont : int;

function Start () {
	
}

function Update () {
	
}

function behaviour_inMyDeck(){
		if(newScene.GetActiveScene() == "my_decks"){
		baseCardBehaviour.sceneCheck = "my_decks";
		}
}

function campaing() {
newScene.LoadScene("world_map");
}

function load_lvl_1_1() {
newScene.LoadScene("phase_1-1");
}

function menu() {
//newScene.LoadScene("menu");
save_Deck();
}

function call_myDeck(){
newScene.LoadScene("my_decks");
}

function call_quit(){
Application.Quit();
}


function save_Deck(){

	for(var i: int; i < deckMachineBehaviour.currentDeck.length; i++){
		if(deckMachineBehaviour.currentDeck[i] != null){
			qtdNum = deckMachineBehaviour.amountDeck[i];
			if(qtdNum > 1){
				for(var g: int; g < deckMachineBehaviour.amountDeck.length; g++){
					cont = i + g;
					deckToSave[cont] = deckMachineBehaviour.currentDeck[i];
				}
			} else {
					deckToSave[i] = deckMachineBehaviour.currentDeck[i];
			}

		}
		Debug.Log(deckToSave[i]);
	}



}
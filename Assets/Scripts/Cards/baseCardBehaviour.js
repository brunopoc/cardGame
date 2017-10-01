#pragma strict
private var sceneCheck : String;
var onDeckManager : boolean; // ------------- VERIFICA SE ESTA NA SEÇÃO DE GERENCIAMENTO DE CARD
private var startPosition : Vector3; // ------------ POSIÇÃO INICAL DA CARTA
private var startScale: Vector3; // ---------------- TAMANHO INICAL DA CARTA

private var velocidadeDaTransicao:float; // -------- VELOCIDADE DA MOVIMENTAÇÃO DA CARTA NO EIXO X
static var notMoveInY:boolean; // ------------------ BLOQUEAR A MOVIMENTAÇÃO DA CARTA EM Y

var deckNumber: int; // ---------------------------- NUMERO DO CARD
var finalSlotRight : boolean; // ------------------- VERIFICA SE ESTÁ NO ULTIMO SLOT DA DIREITA
var finalSlotLeft : boolean; // -------------------- VERIFICA SE ESTÁ NO ULTIMO SLOT DA ESQUERDA
var inMouse : boolean; // -------------------------- VERIFICA SE ESSA CARTA ESTÁ NO MOUSE
static var cardSelected : boolean; // -------------- O PADRÃO DESSA VÁRIAVEL ESTÁ ERRADA AFINS DE TESTE NO BOTÃO NEXT/BACK DO MY DECK SCENE

private var renderthis: Renderer; // --------------- RENDER PRA ALTERAR A ORDER IN LAYER

static var controlStartPosition:boolean; // -------- CONTROLE DAS VEZES QUE SALVA A POSIÇÃO INICIAL

var onMyDeck : boolean;

function Start () {
	prepareVariables (new Vector3(0.08f, 0.07f, 0.615f), this.gameObject.transform.position, 5, GetComponent(Renderer));
} // ---------------------------------------------------------FIM DA FUNÇÃO Start ------------------------------------------------------------



function Update () {
			freezeCard();
			switch (useSceneCheck ('get', 'null')){
			case 'freeze':
				CardWithMouse(mouseBehaviour.moveCard, notMoveInY, inMouse, onMyDeck, cardSelected);
				CardToBackPosition(mouseBehaviour.kingField, inMouse, renderthis, this.gameObject);
			break;
			case 'my_decks':
				CardWithMouse(mouseBehaviour.moveCard, notMoveInY, inMouse, onMyDeck, cardSelected);
				CardToBackPosition(mouseBehaviour.kingField, inMouse, renderthis, this.gameObject);
			break;
			default :
				CardWithMouse(mouseBehaviour.moveCard, notMoveInY, inMouse, onMyDeck, cardSelected); // COMPORTAMENTO DA CARTA COM O MOUSE
				CardInX(); // COMPORTAMENTO DA ROLAGEM DA CARTA
				CardToBackPosition(mouseBehaviour.kingField, inMouse, renderthis, this.gameObject); // COMPORTAMENTE QUE FAZ A CARTA RETORNAR
			break;
						
					}  // ------------------------------ FIM DA VERIFICAÇÃO DA CENA MY DECKS -----------------------------------------------------------
} // ----------------------------------------------- FIM DA FUNÇÃO UPDATE --------------------------------------------------------------------------


function prepareVariables (size : Vector3, position : Vector3, speed : int, render : Renderer){
		  /* ##################################### Quando o Script é executado é necessário preparar as seguintes váriaveis ############### */
	startScale = size;
	startPosition = position;
	velocidadeDaTransicao = speed;
	renderthis = render;
}


private function freezeCard (){
	this.GetComponent.<Rigidbody2D>().velocity = new Vector2(0,0); // -------------- NÃO PERMITE A CARTA FICAR EM MOVIMENTAÇÃO POR COLIDIR
}



function useSceneCheck ( action : String, value : String) {

	switch (action) {
		case 'get' :
			return sceneCheck;
		break;
		case 'set' :
			 if(value != 'null' && value != null){
			 sceneCheck = value;
			 return sceneCheck;
		 }
	}

}


function setSelectedCard (select : boolean) {
	cardSelected = select;
}



function CardWithMouse(movecard : GameObject, freezeY : boolean, inMouse : boolean, onMyDeck : boolean, selected : boolean) {
		  /* ######################################### CONTROLE DE FAZER A CARTA SE MOVIMENTAR DE ACORDO COM O MOUSE ##################### 
			 ############################ FUNCIONA QUANDO O BOTÃO DO MOUSE ESTÁ PRESSIONADO ##############################################
			 ############################ FUNCIONA ENQUANTO O MOUSE ESTÁ EM COLISÃO COM A CARTA ##########################################
			 ############################ QUANDO NÃO ESTÁ MOVENDO EM Y ###################################################################
			 */

			 if(Input.GetMouseButtonDown(0) && movecard != null && freezeY == false && inMouse == true && onMyDeck == false ){
				selected = true;
				setSelectedCard(selected);
			 	mouseBehaviour.moveCard.GetComponent.<Renderer>().sortingOrder = 10;
		    	mouseBehaviour.moveCard.transform.position.z = -5;
		    	mouseBehaviour.moveCard.transform.localScale = new Vector3(0.16f, 0.14f, 1f); // AUMENTA O TAMANHO DA CARTA
		    	mouseBehaviour.moveCard.GetComponent.<Collider2D>().isTrigger = true; // RETIRA A COLISÃO DA CARTA
			 
		    }
		    if (selected == true) {
		    	mouseBehaviour.moveCard.transform.position = mouseBehaviour.position.transform.position;
		    	if(Input.GetMouseButtonUp(0)){
		    		selected = false;
		    		setSelectedCard(selected);
		    	}
		    }
} // ---------------------------------------- FIM DA FUNÇÃO CardWithMouse ------------------------------------------------------------------


function CardToBackPosition(kingField : boolean, inMouse : boolean, render : Renderer, card : GameObject){
		 /* ######################################### CONTROLE DE FAZER A CARTA VOLTAR A SUA POSIÇÃO ORIGINAL ##########################
		    ############################# FUNCIONA QUANDO O BOTÃO DO MOUSE É SOLTO ######################################################## 
		    ############################# QUANDO NÃO ESTÁ NO CAMPO DO REI #################################################################
		    ############################# QUANDO O MOUSE ESTÁ DETECTANDO A CARTA ##########################################################
		    ############################# QUANDO NÃO ESTÁ SENDO MOVIMENTADO EM Y ##########################################################
		    */

		    if(Input.GetMouseButtonUp(0) && inMouse == true){
		    	if(mouseBehaviour.kingField == false && mouseBehaviour.inMove == false && mouseBehaviour.inDelete == false){ // Esse IF não está no padrão certo, está buscando informação numa static (razão: realizar testes / remove bugs)
				    render.sortingOrder = 6;
				    card.transform.position = startPosition;
				   	card.GetComponent.<Collider2D>().isTrigger = false;
				   	controlStartPosition = false;
				   	notMoveInY = false;
				   	cardSelected = false;
			   	}
			   		card.transform.localScale = startScale;
		    }
} // ------------------------------------------------- FIM DA FUNÇÃO CardToBackPosition --------------------------------------------------

function CardInX(){

		    /*######################################### MOVIMENTAÇÃO DO DECK NO EIXO X ####################################################
		    ############### FUNCIONA QUANDO O MOUSE ESTÁ SENDO PRESSIONADO ################################################################
		    ############### QUANDO ESTÁ NO CAMPO DO DECK (OnMouse) ########################################################################
		    ############### QUANDO O MOUSE NÃO ESTÁ PEGANDO NENHUM OBJETO/CARTA ###########################################################
		    ############### QUANDO O MOUSE EM X ESTÁ E MOVIMENTO ##########################################################################*/

			if(Input.GetMouseButton(0) && deckBehaviour.onMouse == true && cardSelected == false) {
				this.gameObject.transform.position.x += Input.GetAxis("Mouse X") * velocidadeDaTransicao * Time.deltaTime;
				notMoveInY = true;
			} // ---------------- A Idéia por trás desse código é deslizar as cartas sem ser necessário usar os botões (não funcional)


} // --------------------------------------- FIM DA FUNÇÃO CardInX -----------------------------------------------------------------------

function OnTriggerEnter2D(coll: Collider2D){    
 	
    if(coll.gameObject.tag == "slot" && controlStartPosition == false && cardSelected == false && onMyDeck == false){
				    startPosition = coll.gameObject.transform.position;		    	  
    } // --------- VERIFICA A COLISÃO COM O SLOT
    if(coll.gameObject.tag == "mouse"){
    	inMouse = true;
    } // --------- VERIFICA A COLISÃO COM O MOUSE


    if(coll.gameObject.name == "cardBehaviour(Clone)"){
   		onMyDeck = true; 
    }

}  // -------------------------------------- FIM DA FUNÇÃO OnTriggerEnter2D ----------------------------------------------------------------

function OnTriggerExit2D(coll: Collider2D){
	if(coll.gameObject.tag == "mouse"){
  		inMouse = false;
    }    

     if(coll.gameObject.name == "cardBehaviour(Clone)"){
   		onMyDeck = false;
    }
       
} // --------------------------------------- FIM DA FUNÇÃO OnTriggerExit2D ----------------------------------------------------------------

/*if(stateMachine.stateCheck != "pause"){ // ------------------------- VERIFICA O ESTADO DO JOGO
								CardWithMouse(); // COMPORTAMENTO DA CARTA COM O MOUSE
								CardInX(); // COMPORTAMENTO DA ROLAGEM DA CARTA
								CardToBackPosition(); // COMPORTAMENTE QUE FAZ A CARTA RETORNAR
								} else {

								} // -------------------------------------- FIM DA VERIFICAÇÃO DE PAUSE -----------------------------------------------


function AllowCardForX(){
	 ######################################### PERMITIR QUE O CARD SE MOVIMENTE OU NÃO DE ACORDO COM OS LIMITES #########################

			if(finalSlotRight == true && deckNumber == 0){
		    	deckBehaviour.blockMovementRight = true; // ------------ Bloqueia o deck
		    }
		     if(finalSlotRight == false && deckNumber == 0){
		    	deckBehaviour.blockMovementRight = false; // ----------- Desbloqueia o deck
		    }
		    if(finalSlotLeft == true && deckNumber == 19){
		   		deckBehaviour.blockMovementLeft = true; // ----------------- Bloqueia o deck
		    }
		     if(finalSlotLeft == false && deckNumber == 19){
		    	deckBehaviour.blockMovementLeft = false; // ------------ Desbloqueia o deck
		    }
} // --------------------------------------- FIM DA FUNÇÃO AllowCardForX ------------------------------------------------------------------


			if(Input.GetMouseButton(0) && mouseBehaviour.onButtonPositionL == true){
				this.gameObject.transform.position.x -= velocidadeDaTransicao * 0.2 * Time.deltaTime;
			}
			if(Input.GetMouseButton(0) && mouseBehaviour.onButtonPositionR == true){
				this.gameObject.transform.position.x += velocidadeDaTransicao * 0.2 * Time.deltaTime;
			}
								*/
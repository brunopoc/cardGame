#pragma strict
// -------------------------------------------------------- Salvar as posições para ocorrer as instâncias em seus devidos lugares
static var allPosition = new Array(); // Matriz que guarda a posição de todas as cartas
static var currentDeck = new Array(); // Matriz que guarda todas as cartas no deck atual
var tempSpace : float;
static var amountDeck = new Array();

 // ------------------------------------------------------- >>> Váriaveis para as instancias das cartas e relativos <<< ----------------------------------------
 var contObj : GameObject;
 var newcontObj : GameObject;
 var excludCard : GameObject; // -------------------------- Botão que exclui -1 do contador das cartas
 var excludCardTemp : GameObject;
 var candNameBack : String;
 var contAmount : int;
 // ------------------------------------------------------- >>> Váriaveis para a função loadDeck() <<< ---------------------------------------------
var cardName : String;
static var cardPosition : Vector3;
var cardObj: GameObject;
var newCard: GameObject;
var cardCont : GameObject;
var cardContTemp : GameObject;
var i : int;
// -------------------------------------------------------- >>> Váriaveis usadas pelos scripts back & next <<< ------------------------------------
var distanciaCard : Vector3;
var firstCheckD : Vector3;
static var tempPosition : Vector3;

static var currentDeckPosition : Vector3[];
var dontHave : boolean;

var collDeckBehaviour : GameObject;

	function Start () {
		prepareVariables ();
	}

	function Update () {
			if(Input.GetMouseButtonUp(0) && collDeckBehaviour != null) {
			dontHave = false;
			addToDeck(collDeckBehaviour.name);
			}
	}
	// ------------------------------------------------------ Compilado de funções de Encapsulamento
	function prepareVariables (){
		amountDeck.length = 20; 
		allPosition.length = 20;
		currentDeck.length = 20;
		dontHave = false;
		setFirstPosition(GameObject.FindGameObjectWithTag("cardBehaviour").transform.position);

	}

	function getFirstPosition () {
			return firstCheckD;
	}

	function getCurrentDeckLength () {
			return currentDeck.length;
	}

	function setDistance(position : Vector3){
			distanciaCard = position;
	}

	function setTempSpace(position : float){
			tempSpace = position;
	}

	function setFirstPosition (position : Vector3) {
			firstCheckD = position;
	}

	function setInAllPosition ( packStorage : Object[]){
			allPosition[packStorage[0]] = packStorage[1];
	}

	function getInAllPosition ( index : int){
			return allPosition[index];
	}

	function getInCurrentDeck ( index : int){
			return currentDeck[index];
	}
	// ------------------------------------------------------ Fim do Compilado de funções de Encapsulamento

	function addToDeck (cardName : String) {
		var i: int;
		var cardNameClone : String = cardName + "(Clone)";
		for(i = 0; i < currentDeck.length; i++){ // ----------------- Um laço para percorrer o array com nomes de cartas em jogo
			if(cardNameClone == currentDeck[i]){ // --------------------------- Trecho que realiza a ação caso exista alguma carta com o mesmo nome
				contObj = GameObject.Find("cardBehaviour(Clone)");
				contObj = contObj.transform.Find(cardNameClone).gameObject;
				contObj = contObj.transform.Find("qtdCard").gameObject;
				contObj = contObj.transform.Find("txtQtdCard").gameObject;
				contAmount = int.Parse(contObj.GetComponent.<UnityEngine.UI.Text>().text);
						if( contAmount < 4 ) {
							contAmount++;
							contObj.GetComponent.<UnityEngine.UI.Text>().text = contAmount.ToString();
							} else {
							Debug.Log("Você já atingiu o limite máxímo desssa carta!");
						}
				amountDeck[i] = contAmount;
				dontHave = true;
				i = currentDeck.length;
				} 
		}

		if(dontHave == false) { // ---------------------------------------- Será necessário uma nova instância do card
				
				cardName = "Prefabs/" + "Deck" + "/Card/" + cardName; // ----------------------------------------- Monta o caminho onde estão os prefabs da carta
				var newCard : GameObject = Resources.Load(cardName) as GameObject; // --------------------------------------------- Carrega a carta de acordo com o caminho
				if(newCard != null){
						for(var h : int = 0; h < allPosition.length; h++) {
								if(allPosition[h] == null) {
									amountDeck[h] = 1;
									if(h >= 1) { // ---------------------------------------------------------- SE FOR MAIOR OU IGUAL A 1, CASO CONTRÁRIO É A PRIMEIRA
										h -= 1; // ---------------------------------------------------------- VOLTA UMA POSIÇÃO
										cardPosition = allPosition[h]; // ----------------------------------- PEGA A POSIÇAO ANTERIOR
										cardPosition.x += 0.6f - tempSpace; // ------------------------------------------ AVANÇA 0.6
										h += 1;
									} else { // ------------------------------------------------------------- Se for a primeira seta o posição padrão
										cardPosition = new Vector3(-0.8f - tempSpace, 1.35f, 1); // ------- posição padrão
									}
									i = h; // --------------------------------------------------------------- Joga a posição no I para ser trabalhado pela nova instancia
									h = allPosition.length; // -------------------- SAÍ DO LOOPING
								} 
							}
						
							newCard = Instantiate(newCard, cardPosition, Quaternion.identity); // ---------------------------------- Instancia a carta
							cardContTemp = Instantiate (cardCont, new Vector3(0,0,1), Quaternion.identity); // --------------------- Instãncia uma IMG com TEXT (todos componentes do CANVAS)
							cardContTemp.transform.SetParent (GameObject.FindGameObjectWithTag("Canvas").transform, false); // ----- Tira o img do canvas
							cardContTemp.transform.position = cardPosition; // ----------------------------------------------------- Posicioina o obj junto com sua respectiva carta
							cardContTemp.transform.position.y += -0.35f; // -------------------------------------------------------- Ajuste da posição
							cardContTemp.transform.position.x += -0.22f; // -------------------------------------------------------- Ajuste da posição
							currentDeck[i] = newCard.name; // ---------------------------------------------------------------------- Manda para o array de controle
							allPosition[i] = newCard.transform.position;
							cardObj = GameObject.Find("cardBehaviour(Clone)"); // -------------------------------------------------- Procura o componente que abriga as cartas
							cardObj.transform.SetParent(GameObject.FindGameObjectWithTag("Canvas").transform); // ------------------ Adiciona esse componente no canvas
							newCard.transform.parent = cardObj.transform; // ------------------------------------------------------- Adiciona a carta no componente que abriga elas
							cardContTemp.transform.SetParent(newCard.transform); // ------------------------------------------------ Define o componente de IMG e texto como filho da carta
							cardContTemp.name = "qtdCard"; // ---------------------------------------------------------------------- Edita o nome da carta
							cardContTemp.GetComponent.<RectTransform>().sizeDelta = new Vector2 (25, 25); // ----------------------- Controla o tomanho da IMG e texto
							cardContTemp.GetComponent.<RectTransform>().localScale = new Vector3 (0.0625f, 0.0714f, 1); // --------- Controla o tamanho da IMG e texto
							newcontObj = cardContTemp.transform.Find("txtQtdCard").gameObject; // ---------------------------------- Procura o componente de texto
							contAmount = 1; // ------------------------------------------------------------------------------------- Adiciona o numero 1 a uma váriavel
						    newcontObj.GetComponent.<UnityEngine.UI.Text>().text = contAmount.ToString(); // ----------------------- Coloca esse 1 no componente de texto
						    excludCardTemp = Instantiate (excludCard, new Vector3(0,0,0), Quaternion.identity); // ----------------- Instancia o botão de exclusão
						    excludCardTemp.transform.SetParent (GameObject.FindGameObjectWithTag("Canvas").transform, false); // --- Retira parentesco
						    excludCardTemp.transform.SetParent(newCard.transform); // ---------------------------------------------- Define parentesco
						    excludCardTemp.GetComponent.<RectTransform>().sizeDelta = new Vector2 (25, 25); // --------------------- Seta o tamanho
							excludCardTemp.GetComponent.<RectTransform>().localScale = new Vector3 (0.0625f, 0.0714f, 1); // ------- Seta o localScale
							excludCardTemp.transform.position = cardPosition; // --------------------------------------------------- Seta a posição
							excludCardTemp.transform.position.y += 0.35f; // ------------------------------------------------------- Ajuste da posição
							excludCardTemp.transform.position.x += 0.22f; // ------------------------------------------------------- Ajuste da posição
							cardPosition.x += 0.6f; // ----------------------------------------------------------------------------- Avança a posição para a proxíma carta
			}
		}
	}

	function OnTriggerEnter2D(coll: Collider2D){   
   	 if(coll.gameObject.tag == "card" && coll.gameObject.GetComponent.<baseCardBehaviour>().onDeckManager == false){
   		collDeckBehaviour = coll.gameObject;
   	 }
	}

	function OnTriggerExit2D(coll: Collider2D){
 		if(coll.gameObject.tag == "card"){
   			collDeckBehaviour = null;
    	}
	}
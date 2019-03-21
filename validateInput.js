/**
 * Modulo de Validaciones de entrada de Texto
 * @required: ECMAScript 2015 (ES6)
 * @author: Edwin Betancourt <EdwinBetanc0urt@outlook.com>
 * @version 0.6
 * @created: 05-Abril-2018
 * @dependency: jQuery +3.3.1 para validateción priece format

 * @description:
		Este programa es software libre, su uso, redistribución, y/o modificación
	debe ser bajo los términos de las licencias indicadas, la GNU Licencia Pública
	General (GPL) publicada por la Fundación de Software Libre(FSF) de la versión
	3 o cualquier versión posterior y la Creative Commons Atribución - Compartir
	Igual (CC BY-SA) de la versión 4.0 Internacional o cualquier versión posterior.

		Este software esta creado con propósitos generales que sean requeridos,
	siempre que este sujeto a las licencias indicadas, pero SIN NINGUNA GARANTÍA
	Y/O RESPONSABILIDAD que recaiga a los creadores, autores y/o desarrolladores,
	incluso sin la garantía implícita de COMERCIALIZACIÓN o IDONEIDAD PARA UN
	PROPÓSITO PARTICULAR. Cualquier MODIFICACIÓN, ADAPTACIÓN Y/O MEJORA que se haga
	a partir de este código debe ser notificada y enviada a la fuente, comunidad
	o repositorio de donde fue obtenida, y/o a sus AUTORES.
 */
var modValidacion = (() => {

	// private methods and properties
	const _inputs_html = 'textarea, input[type=text], input[type=password], ' +
		'input[type=number],  input[type=date], input[type=email], input[type=url], ' +
		'input[type=tel], input[type=datetime-local], input[type=search], ' +
		'input[type=month], input[type=time], input[type=week]';

	/**
	 * [_addEvent description]
	 * @param       {String} _Selector Selectors HTML DOM (tag, #id, .class) separate with ','
	 * @param       {Array | String} _Events    DOM Events to add in HTML inputs
	 * @param       {RegExp} _Pattern  Pattern in regular expresion
	 * @param       {String} _Replace  Value to replace, default string empty ""
	 */
	const _addEvent = (_Selector, _Pattern, _Events = 'blur, keyup', _Replace = '') => {
		let _domElements = document.querySelectorAll(_Selector);

		if (! Array.isArray(_Events) || typeof _Events === 'string') {
			_Events = _Events.split(',');
		}

		// itinerate elements DOM
		for(let i = 0; i < _domElements.length; i++){
			// itinerate array events
			for (let j = 0; j < _Events.length; j++) {
				_addIndividualEnvent(
					_domElements[i],
					_Pattern,
					_Events[j].trim(),
					_Replace
				);
			}
		}
	};

	/**
	 * 
	 * @param {*} _Selector 
	 * @param {*} _Pattern 
	 * @param {*} _Event 
	 * @param {*} _Replace 
	 */
	const _addIndividualEnvent = (_Selector, _Pattern, _Event, _Replace = '') => {
		// add event into DOM
		_Selector.addEventListener(_Event, (event) => {
			this.value = this.value.replace(_Pattern, _Replace);
		});
	};

	/**
	 * Remove accents in text and replace with equivalent letter
	 * @param {String} _Text 
	 */
	const _removeAccents = (_Text) => {
		//console.log("palabra actual: " + _Text);
		/*
		_Text = _Text.replace(/[ñ]/n, 'n');
		_Text = _Text_Text.replace(/[ç]/, 'c');
		*/
		_Text = _Text
			.replace(/[áäàâãå]/gi, 'a')
			.replace(/[ÁÄÂÃÀ]/gi, 'A')
			.replace(/[éëè]/gi, 'e')
			.replace(/[ÉËÊÈ]/gi, 'E')
			.replace(/[íïîì]/gi, 'i')
			.replace(/[ÍÏÎÌ]/gi, 'I')
			.replace(/[óöôò]/gi, 'o')
			.replace(/[ÓÖÔÒ]/gi, 'O')
			.replace(/[úüûù]/gi, 'u')
			.replace(/[ÚÜÛÙ]/gi, 'U')
			.replace(/[ýÿ]/gi, 'y')
			.replace(/[Ý]/gi, 'Y');
	
		return _Text;
	};

	return {
		//métodos y propiedades públicos

		/**
		 * validation so that it does not allow you to start typing with spaces and/or
		 * do not allow 2 consecutive spaces at the end
		 */
		validatete_spaces: () => {
			let _domElements = document.querySelectorAll(
				"textarea, " +
				"input[type=text], input[type=number], input[type=password], " +
				"input[type=email], input[type=search], input[type=url], " +
				"input[type=tel], input[type=date], input[type=datetime-local], " +
				"input[type=month], input[type=time], input[type=week]"
			);
			let _Pattern = /^\s+/;

			for(let i = 0; i < _domElements.length; i++){
				_domElements[i].addEventListener('keydown', function(_Event){
					//remove spaces at the beginning
					this.value = this.value.replace(_Pattern, '');

					//remove consecutive spaces
					this.value = this.value.replace(/ +/gim, ' ');
				});
				_domElements[i].addEventListener('blur', function(_Event){
					//remove spaces at the beginning
					this.value = this.value.replace(_Pattern, '');

					//remove consecutive spaces
					this.value = this.value.replace(/ +/gim, ' ');
				});
			}
		},

		validatete_no_spaces: (_Selector = '.validatete_no_spaces') => {
			let _Pattern = / /gim;
			_addEvent(_Selector, _Pattern);
		},

		//removes the accents and diacritics
		value_without_diacritic: (
			_Selector = '.value_without_diacritic, .valor_sin_diacriticos',
			_Language = 'es') => {
			let _idiomaHTML = window.navigator.language || navigator.browserLanguage;
			let _domElements = document.querySelectorAll(_Selector);
			let _es = ['es', 'es-ES', 'español', 'spanish'];
			//Recorremos cada uno de nuestros elementos DOM HTML

			for(let i = 0; i < _domElements.length; i++){
				if (_es.indexOf(_idiomaHTML) > -1
					|| _es.indexOf(_domElements[i].getAttribute("lang")) > -1 ) {
					_Pattern = /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi;
					_Reemplazo = "$1";
				}
				else {
					_Pattern = /[\u0300-\u036f]/g;
					_Reemplazo = "";
				}
				_domElements[i].addEventListener('input', function(_Event) {
					this.value = this.value
						.normalize('NFD')
						.replace(_Pattern, _Reemplazo)
						.normalize();
				});
			}
		},

		//validateción para el ancho máximo de los input number, ya que por diseño
		//solo admite el atributo min y max
		validate_maximo: (_Selector = "input[type=number]") => {
			let _domElements = document.querySelectorAll(_Selector);
			//Recorremos cada uno de nuestros elementos DOM HTML
			for(let i = 0; i < _domElements.length; i++){
				_domElements[i].addEventListener('input', function(_Event) {
					//es necesaria la condición ya que los type number no manejan
					//el atributo maxlength
					if (this.getAttribute("maxlength")) {
						let liMax = this.getAttribute("maxlength");
						//si esta definido el atributo max
					}
					else if (this.getAttribute("max")) {
						let liMax = this.getAttribute("max").length;
					}
					else {
						//continue; //no funciona porque dentro del for existe una función
						return;
					}
					this.value = this.value.slice(0, liMax);
				});
			}
		},

		//Coloca todas las letras en mayúscula
		valor_mayuscula: (_Selector = '.valor_mayuscula') => {
			let _domElements = document.querySelectorAll(_Selector);
			//Recorremos cada uno de nuestros elementos DOM HTML
			for(let i = 0; i < _domElements.length; i++) {
				_domElements[i].addEventListener('input', function(_Event) {
					this.value = this.value.toUpperCase();
				});
			};
		},

		//Coloca todas las letras a minúsculas
		valor_minuscula: (_Selector = '.valor_minuscula') => {
			let _domElements = document.querySelectorAll(_Selector);
			//Recorremos cada uno de nuestros elementos DOM HTML
			for(let i = 0; i < _domElements.length; i++) {
				_domElements[i].addEventListener('input', function(_Event) {
					this.value = this.value.toLowerCase();
				});
			};
		},

		//Coloca la inicial en mayúscula, como la función ucfirst en PHP
		valor_mayuscula_primera: (_Selector = '.valor_mayuscula_primera') => {
			let _domElements = document.querySelectorAll(_Selector);
			let _Pattern = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/g;
			//Recorremos cada uno de nuestros elementos DOM HTML
			for(let i = 0; i < _domElements.length; i++) {
				_domElements[i].addEventListener('keyup', function(_Event) {
					//this.value = this.value.replace(_Pattern);
					this.value = this.value.toLowerCase();
					this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
				});
			};
		},
		//Coloca la inicial en mayúscula, como la función ucfirst en PHP
		valor_mayuscula_inicial: (_Selector = '.valor_mayuscula_inicial') => {
			modValidacion.valor_mayuscula_primera(_Selector);
		},

		//Coloca primera letra en mayúscula de cada palabra, como la función ucwords en PHP
		valor_capitalize: (_Selector = '.valor_capitalize') => {
			let _Pattern = /\b[a-z]/g;
			let _Pattern2 = /^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g;
			let _domElements = document.querySelectorAll(_Selector);

			//Recorremos cada uno de nuestros elementos DOM HTML
			for(let i = 0; i < _domElements.length; i++) {
				_domElements[i].addEventListener('keyup', function(_Event) {
					this.value = this.value.toLowerCase().replace(_Pattern, (letra) => {
						return letra.toUpperCase();
					});
				});
			};
		},

		//validateciones para valores NUMERICOS con 0 antes
		validateNumber: (_Selector = '.validate-number') => {
			let _Pattern = /[^0-9]/g;
			_addEvent(_Selector, _Pattern);
		},

		//MEJORAR VALIDACION DEL PRIMER CARACTER EN 0 CON EXPRESIONES REGULARES
		//validate que solo sean números enteros
		validate_num_entero: (_Selector = '.validate_num_entero') => {
			let _Pattern = /[^0-9]/g;
			//let _Pattern = /^[0-9]{0,12}([,][0-9]{2,2})?$/g;
			///let _Pattern = /^[0-9]{0,12}([,][0-9]{2,2})?$/g;
			//let _Pattern = /^[1-9]{1}([0-9]{1,})?$/g;
			//this.value = this.value.replace(/^[1-9][0-9]*$/g, '');
			//this.value = this.value.replace(/^[1-9]\d*$/g, '');
			//this.value = this.value.replace(/[1-9]\d*/g, '');
			//this.value = this.value.replace(/^\d*$/g, '');
			//this.value = this.value.replace(/^-?(?:0?[1-9]\d*|0)$/g, '');
			//let _Pattern = /^[1-9]{1}[0-9]{2,}/g;
			//let _Pattern = /[1-9]\d{0,}/g; //numero mayora cero
			let _domElements = document.querySelectorAll(_Selector);

			//Recorremos cada uno de nuestros elementos DOM HTML
			for(let i = 0; i < _domElements.length; i++){
				_domElements[i].addEventListener('keyup', function(_Event){
					this.value = this.value.replace(_Pattern, '');
					while(this.value.charAt(0) == "0") {
						this.value = this.value.substring(1);
					}
				});
				_domElements[i].addEventListener('blur', function(_Event) {
					this.value = this.value.replace(_Pattern, '');
					while(this.value.charAt(0) == "0") {
						this.value = this.value.substring(1);
					}
				});
			}
		},

		// validate only letters from A to Z
		validateAlphabetic: (_Selector = '.validate-alphabetic') => {
			let _Pattern = /[^a-zA-Zá-úÁ-Úä-üÄ-Üà-ùÀ-Ù ]/gi;
			//let _Pattern = /[0-9¨´`~!@#$%^&*()_°¬|+\-=¿?;:'",.<>\{\}\[\]\\\/]/gi;
			_addEvent(_Selector, _Pattern);
		},

		validateAlfaNumeric: (_Selector = '.validate-alphanumeric') => {
			let _Pattern = /[¨´`'"~!@#$%^&*()_°¬|+\-=?;:,._ç*+/¡<>\{\}\[\]\\\/]/gi;
			_addEvent(_Selector, _Pattern);
		},

		//validateciones para NUMEROS DE TELEFONO Y FAX, locales e internacionales
		//falta validater que no repita mas de 1 vez el guion y el mas
		validate_num_telefono: (_Selector = '.validate_num_telefono') => {
			let _Pattern = /[^0-9+-]/gi;
			let _domElements = document.querySelectorAll(_Selector);

			//Recorremos cada uno de nuestros elementos DOM HTML
			for(let i = 0; i < _domElements.length; i++){
				_domElements[i].addEventListener('keyup', function(_Event){
					this.value = this.value.replace(_Pattern, '');
					//validate la primera posición sea un cero o un mas
					tam = this.value.length; //toma el tamaño de la cadena
					//sino identifica inicialmente el + toma un cero
					if (this.value.charAt(0) != "+") {
						this.value = "0" + this.value.substr(1);
						if (tam == 4 && this.value.charAt(4) != "-")
							this.value = this.value.substr(0, 4) + "-" + this.value.substr(5);
					}
					else {
						this.value = "+" + this.value.substr(1);
						if (tam == 3 && this.value.charAt(4) != "-")
							this.value = this.value.substr(0, 3) + "-" + this.value.substr(3);
					}

					//si el carácter en la posición final y la antepenúltima son iguales
					//y a su vez igual a un guion o un mas elimina el ultimo repetido
					if (this.value.charAt(tam - 1) == this.value.charAt(tam - 2) && (this.value.charAt(tam - 1) == "-" || this.value.charAt(tam - 1) == "+")) {
						//toma el valor desde la posicion cero hasta una posición menos, borrando 1 de los guiones al final
						this.value = this.value.substr(0, tam - 1);
					}
				});
				_domElements[i].addEventListener('blur', function(_Event){
					this.value = this.value.replace(_Pattern, '');
					//validate la primera posición sea un cero o un mas
					tam = this.value.length; //toma el tamaño de la cadena
					//sino identifica inicialmente el + toma un cero
					if (this.value.charAt(0) != "+") {
						this.value = "0" + this.value.substr(1);
						if (tam == 4 && this.value.charAt(4) != "-")
							this.value = this.value.substr(0, 4) + "-" + this.value.substr(5);
					}
					else {
						this.value = "+" + this.value.substr(1);
						if (tam == 3 && this.value.charAt(4) != "-")
							this.value = this.value.substr(0, 3) + "-" + this.value.substr(3);
					}

					//si el carácter en la posición final y la antepenúltima son iguales
					//y a su vez igual a un guion o un mas elimina el ultimo repetido
					if (this.value.charAt(tam - 1) == this.value.charAt(tam - 2) && (this.value.charAt(tam - 1) == "-" || this.value.charAt(tam - 1) == "+")) {
						//toma el valor desde la posicion cero hasta una posición menos, borrando 1 de los guiones al final
						this.value = this.value.substr(0, tam - 1);
					}
				});
			}
		},

		//validateciones para NUMEROS DE TELEFONO Y FAX, locales e internacionales
		//falta validater que no repita mas de 1 vez el guion y el mas
		validate_telefono_mundial: (_Selector = '.validate_num_telefono') => {
			let _Pattern = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/g;
			_addEvent(_Selector, _Pattern);
			/*
			+584246573321
			+42 555.123.4567
			+1-(800)-123-4567
			+7 555 1234567
			+7(926)1234567
			(926) 1234567
			+79261234567
			*/
		},

		validate_num_real: (_Selector = ".validate_num_real") => {
			let _Pattern = /[^0-9.]/g;
			_addEvent(_Selector, _Pattern);
		},

		validateBanckAccount: (_Selector = '.validate_num_banco, .validate_cuenta_banco') => {
			let _Pattern = /[^0-9][-]{}$/g;
			_addEvent(_Selector, _Pattern);
		},

		validate_operacion_numerica: (_Selector = ".validate_operacion_numerica") => {
			let _Pattern = /[^0-9.+*\-\/%=]/g;
			_addEvent(_Selector, _Pattern);
		},

		validate_etiqueta_html: (_Selector = ".validate_html_tag") => {
			//let _Pattern = /[^0-9'"a-z<>\-\/\\=_ ]/gi;
			let _Pattern =/^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/g
			_addEvent(_Selector, _Pattern);
		},

		validate_correo: (_Selector = ".validate_correo") => {
			//let _Pattern = /[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9.-]+/i;
			let _Pattern = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{1,})$/i;
			let _domElements = document.querySelectorAll(_Selector);

			//Recorremos cada uno de nuestros elementos DOM HTML
			for(let i = 0; i < _domElements.length; i++) {
				//enfoca si no pasa validatecion
				_domElements[i].addEventListener('blur', function(_Event) {
					_Event.preventDefault();

					// x@x.xx
					//if( !this.value.match(/^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{1,}$/i) ) {
					if( !this.value.match(_Pattern)
					&& this.value.trim() != "") {
					// x@xx.x
					//if( !(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/.test(this.value)) ) {
					//if( !(/^\w+([\.\-\_]?\w+)*@\w+([\.\-\_]?\w+)*([\.\-\_]?\w{1,})+$/.test(this.value)) ) {
						setTimeout(
							function(){
								_domElements[i].focus();
							},
							10
						);
						console.log("correo malo");
					}
					else if (this.value.trim() == "") {
						console.log("correo vacio");
					}
					else {
						console.log("correo bien");
					}
					//_domElements[i].focus();

					//_removeAccents(this.value);
				});

				_addIndividualEnvent(_domElements[i], /[ñ` ´~!#%^&$¡¨¿*()°¬|+\=?,;:'"<>\{\}\[\]\\\/]/, 'keyup');
			};
		},

		validate_direccion: (_Selector = ".validate_direccion") => {
			let _Pattern = /[`~!@%^&$¡¨¿*_¬|+\=?;:'"<>\{\}\[\]]/gi;
			_addEvent(_Selector, _Pattern);
		},

		// validate el grupo sanguíneo A+, A-, O+, A-
		validate_sangre: (_Selector = ".validate_sangre") => {
			///let _Pattern = /^[aboABO-+]/gi;
			let _Pattern = /[^aboABO+-]/g;
			_addEvent(_Selector, _Pattern);
		},

		validate_rif: (_Selector = ".validate_rif") => {
			//let _Pattern = /^([VEJPGC]{1})([0-9]{7,9})$/g;
			let _Pattern = /^[VEJPGC][-][0-9]{7,9}[-][0-9]{1}$/g;
			_addEvent(_Selector, _Pattern);
		},

		validate_mac: (_Selector = ".validate_mac") => {
			let _Pattern = /[a-fA-F0-9.+_-]+:[a-fA-F0-9.+_-]+:[a-fA-F0-9.+_-]+:[a-fA-F0-9.+_-]+:[a-fA-F0-9.+_-]+:[a-fA-F0-9.+_-]+/gi;
			_addEvent(_Selector, _Pattern);
		},

		validate_ip: (_Selector = ".validate_ip") => {
			let _Pattern = /\b([1-9]|[1-9][0-9]|1([0-9][0-9])|2([0-4][0-9]|5[0-5]))\.([0-9]|[1-9][0-9]|1([0-9][0-9])|2([0-4][0-9]|5[0-5]))\.([0-9]|[1-9][0-9]|1([0-9][0-9])|2([0-4][0-9]|5[0-5]))\.([0-9]|[1-9][0-9]|1([0-9][0-9])|2([0-4][0-9]|5[0-5]))\b/g;
			_addEvent(_Selector, _Pattern);
		},

		validate_ip_puerto: (_Selector = ".validate_ip_puerto") => {
			let _Pattern = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}:[0-9]{1,5}/g;
			_addEvent(_Selector, _Pattern);
		},

		validate_num_moneda: (_Selector = ".validate_num_moneda") => {
			let _Pattern = /^[0-9]{0,12}([,][0-9]{2,2})?$/g;
			// validateciones para NUMEROS DECIMALES
			$('.validate_num_moneda').keyup(function() {
				this.value = this.value.replace(/[^0-9,.]/g, '');

				//Busca la coma y cambia por un punto
				if (this.value.indexOf(","))
					this.value = this.value.replace(/[^0-9.]/g, '.');

				//validate la primera posición que no sea un cero, punto o coma
				if (this.value.charAt(0) == "0" || this.value.charAt(0) == "." || this.value.charAt(0) == ",") {
					this.value = this.value.substring(1);
					this.value = this.value.replace(/[^0-9]/g, '');
				}

				//validate la posición final para que no se repitan dos comas o puntos
				tam = this.value.length; //toma el tamaño de la cadena
				//si el carácter en la posición final y la antepenúltima son iguales y a su vez igual a un punto
				if (this.value.charAt(tam - 1) == this.value.charAt(tam - 2) && this.value.charAt(tam - 1) == ".") {
					//toma el valor desde la posicion cero hasta una posición menos, borrando 2 puntos consecutivos
					this.value = this.value.substr(0, tam - 1);
				}
			});

			if(typeof priceFormat === 'function') {
				$('.validate_moneda_bolivares').priceFormat({
					prefix: '', //simbolo de moneda que va al principio (predeterminado toma USD$)
					suffix: '', //simbolo de moneda que va al final
					centsSeparator: '.', //separador de sentimos
					thousandsSeparator: '', //separador de miles
					insertPlusSign: false //un mas al principio
					//allowNegative: true //permite negativos
				});
			}
			let _domElements = document.querySelectorAll('.validate_direccion');
			//Recorremos cada uno de nuestros elementos DOM HTML
			for(let i = 0; i < _domElements.length; i++){
				_domElements[i].addEventListener('keyup', function(_Event){
					this.value = this.value.replace(/[`~!@%^&$¡¨¿*_¬|+\=?;:'"<>\{\}\[\]]/gi, '');
				});
			};
		},

		validate_url: (_Selector = ".validate_url") => {
			//let _Pattern = /([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/;
			let _Pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
			//let _Pattern = /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)( [a-zA-Z0-9\-\.\?\,\'\/\\\+&%\$#_]*)?$/;
			//let _Pattern = /^((ht|f)tp(s?)\:\/\/)?[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)( [a-zA-Z0-9\-\.\?\,\'\/\\\+&%\$#_]*)?$/;
			let _domElements = document.querySelectorAll('.validate_url');

			//Recorremos cada uno de nuestros elementos DOM HTML
			for(let i = 0; i < _domElements.length; i++) {
				//enfoca si no pasa validatecion
				_domElements[i].addEventListener('blur', function(_Event) {
					_Event.preventDefault();

					if( !this.value.match(_Pattern)
					&& this.value.trim() != "") {
						setTimeout(
							function(){
								_domElements[i].focus();
							},
							10
						);
						console.log("url mala");
					}
					else if (this.value.trim() == "") {
						console.log("url vacia");
					}
					else {
						console.log("url bien");
					}
					this.value = _removeAccents(this.value);
				});

				_addIndividualEnvent(_domElements[i], /[ñ` ´~!#%^&$¡¨¿*()°¬|+\=?,;:'"<>\{\}\[\]\\\/]/, 'keyup');
			};
		},

		validate_tiempo: (_Selector = ".validate_tiempo") => {
			let _Pattern = /([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?/g;
			//let _Pattern = /^(0[1-9]|1\d|2[0-3]):([0-5]\d):([0-5]\d)$/g;
			//let _Pattern = /^(0[1-9]|1\d|2[0-3]):([0-5]\d):([0-5]\d)$/g;
			_addEvent(_Selector, _Pattern);
		},

		validate_fecha: (_Selector = ".validate_fecha") => {
			let _Pattern = /(0[1-9]|[12][0-9]|3[01])[\/.](0[13578]|1[02])[\/.](20)[0-9]{2}|(0[1-9]|[12][0-9]|30)[\/.](0[469]|11)[\/.](20)[0-9]{2}|(0[1-9]|1[0-9]|2[0-8])[\/.](02)[\/.](20)[0-9]{2}|29[\/.](02)[\/.](((20)(04|08|[2468][048]|[13579][26]))|2000)/g;
			//let _Pattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/g;
			_addEvent(_Selector, _Pattern);
		},

		validate_fecha_tiempo: (_Selector = ".validate_fecha_tiempo") => {
			let _Pattern = /^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/g;
			_addEvent(_Selector, _Pattern);
		},

		validate_codigo_postal: (_Selector = ".validate_codigo_postal") => {
			let _Pattern = /((0[1-9]|1[0-2])\-(0[1-9]|1[0-9]|2[0-9]|3[01])\-\d{4})(\s+)(([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])|24:00:00)/g;
			_addEvent(_Selector, _Pattern);
		},

		validate_color_hex: (_Selector = ".validate_color_hex") => {
			let _Pattern = /[#]([\dA-F]{6}|[\dA-F]{3})/g;
			_addEvent(_Selector, _Pattern);
		},

		validate_direccion_bitcoin: (_Selector = ".validate_direccion_bitcoin") => {
			let _Pattern = /([13][a-km-zA-HJ-NP-Z0-9]{26,33})/g;
			_addEvent(_Selector, _Pattern);
		},

		validate_hastag: (_Selector = ".validate_hastag") => {
			let _Pattern = /([@][A-z]+)|([#][A-z]+)/g;
			_addEvent(_Selector, _Pattern);
		},

		validateAll: () => {
			modValidacion.validatete_spaces();
			modValidacion.value_without_diacritic();
			modValidacion.valor_minuscula();
			modValidacion.valor_mayuscula_primera();
			modValidacion.valor_capitalize();
			modValidacion.valor_mayuscula();
			//modValidacion.validate_maximo();

			modValidacion.validateNumber();
			modValidacion.validate_num_entero();
			modValidacion.validateAlphabetic();
			modValidacion.validate_sangre();
			modValidacion.validateAlfaNumeric();
			modValidacion.validate_correo();
			modValidacion.validate_direccion();
			modValidacion.validate_num_telefono();
			modValidacion.validate_num_real();
			modValidacion.validate_operacion_numerica();
			modValidacion.validate_etiqueta_html();
			modValidacion.validateBanckAccount();
		},

		validater_inner: () => {
			modValidacion.validateAll();
			console.log("Reasignada la validateción a los innerHTML ");
		}
	} // end return
})();

function validateAll() {
	modValidacion.validateAll();
}

function validater_inner() {
	modValidacion.validater_inner();
}

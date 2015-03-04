var Base64 = new function()
{
	//Canvas
	this.canvas = null;
	
	//Imagen
	this.img = new Image();
	
	//Base 64
	this.base = '';
	
	//Funcion que cierra la ventana
	this.OpenClose = function()
	{
		//Cogemos el ID
		var id1 = document.getElementById('screen1');
		var id2 = document.getElementById('screen2');
		
		//Abrimos/cerramos
		id1.style.display = (id1.style.display == 'block') ? 'none' : 'block'; 
		id2.style.display = (id2.style.display == 'block') ? 'none' : 'block'; 
	};
	
	//Cogemos la imagen
	this.GetImg = function()
	{
		//Hacemos click en el boton de seleccionar imagen
		document.getElementById("upload").click();
	};
	
	//Funcion que carga la imagen
	this.LoadImg = function()
	{
		//Cogemos la imagen
		var filesSelected = document.getElementById("upload").files;
		
		//Comprobamos si hay algun archivo
		if (filesSelected.length > 0)
		{
			//Cogemos el primero
			var fileToLoad = filesSelected[0];
			
			//Nuevo FileReader
			var fileReader = new FileReader();
			
			//Funcion para cargar el fichero
			fileReader.onload = function(fileLoadedEvent)
			{
				//Cogemos la imagen
				var srcData = fileLoadedEvent.target.result;
				
				//Creamos la imagen
				Base64.img = new Image();
				Base64.img.src = srcData;
			}
			
			//Cargamos nuestra imagen
			fileReader.readAsDataURL(fileToLoad);
			
			//Creamos el canvas
			setTimeout(function(){Base64.OpenClose(); Base64.LoadCanvas();}, 500);
		}
	};
	
	//Funcion que crea el canvas y situa la imagen
	this.LoadCanvas = function()
	{
		//Creamos el canvas
		this.canvas = new jmCanvas('canvas', this.img.width, this.img.height);
		
		//Lo iniciamos
		this.canvas.Start();
		
		//Borramos todo
		this.canvas.DeleteAll();
		
		//Ponemos la imagen
		this.canvas.Image(this.img, 0, 0, 1);
		
		//Cogemos el base64
		this.base = this.canvas.id.toDataURL();
		
		//Lo ponemos en el input
		document.getElementById('textarea').value = this.base;
		
	};
	
	//Funcion para copiar al clipboard
	this.Copy = function ()
	{
		window.prompt("Copy to clipboard: Ctrl+C, Enter", this.base);
	};
	
};
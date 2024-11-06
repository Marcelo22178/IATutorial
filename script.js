const form = document.getElementById("uploadForm");
const spinner = document.getElementById("spinner");
const url = "YOUR_URL" // tu link 
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const pdfFile = document.getElementById("pdfFile").files[0];
  const textInput = document.getElementById("textInput").value;

  const fileName = pdfFile.name;
  const fileType = pdfFile.type; // Obtener el tipo MIME del archivo

  // Crear un objeto para enviar como JSON
  const formData = {
    fileName: fileName,
    fileType: fileType,
    pregunta: textInput
  };

  // Convertir el archivo PDF a base64
  const reader = new FileReader();
  reader.onloadend = async () => {
    formData.file = reader.result.split(",")[1]; // Obtener el contenido base64 del archivo

    try {
      // Mostrar el spinner
      spinner.style.display = "block";

      // Hacer la petición POST al servidor
      const response = await fetch(
        url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      if (response.ok) {
    const data = await response.json(); // Convertir la respuesta en JSON
    const respuesta = data.respuesta; // Obtener el valor de la propiedad 'respuesta'
    document.getElementById("responseText").value = respuesta; // Asignar el valor al textarea
} else {
        document.getElementById("responseText").value =
          "Error en la respuesta del servidor.";
      }
    } catch (error) {
      console.error("Error al enviar la petición:", error);
      document.getElementById("responseText").value =
        "Error al enviar la petición.";
    } finally {
      // Ocultar el spinner
      spinner.style.display = "none";
    }
  };

  reader.readAsDataURL(pdfFile); // Leer el archivo PDF como base64
});

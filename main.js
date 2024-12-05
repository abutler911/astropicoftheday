const API_KEY = "4DhdzclolOKA1keDcrHmhe0v3HugWOl0zk9mQnBr";

const data = async () => {
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${
      document.getElementById("date").value
    }`
  );
  const json = await response.json();
  return json;
};

const display = async () => {
  const json = await data();
  if ("copyright" in json) {
    document.getElementById(
      "copyRight"
    ).innerHTML = `Image Credit: ${json.copyright}`;
  } else {
    document.getElementById("copyRight").innerHTML = "";
  }
  console.log(json);
  console.log(document.getElementById("date").value);
  document.getElementById("title").innerHTML = json.title;
  if ("hdurl" in json) {
    document.getElementById("picture").src = json.hdurl;
  } else {
    document.getElementById("picture").src = json.url;
  }

  document.getElementById("explanation").innerHTML = json.explanation;
};

document.getElementById("imageBtn").addEventListener("click", display);

const fetchAPOD = async (date) => {
  try {
    const response = await fetch(`/api/apod?date=${date}`);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const json = await response.json();

    return json;
  } catch (error) {
    console.error("Error fetching data from NASA API:", error.message);
    return { error: "Failed to fetch data" };
  }
};

const display = async () => {
  const date = document.getElementById("date").value || null;
  const json = await fetchAPOD(date);

  if (json.error) {
    document.getElementById("title").innerHTML = "Error fetching data!";
    document.getElementById("explanation").innerHTML = "";
    document.getElementById("picture").src = "";
    document.getElementById("copyRight").innerHTML = "";
    return;
  }

  if ("copyright" in json) {
    document.getElementById(
      "copyRight"
    ).innerHTML = `Image Credit: ${json.copyright}`;
  } else {
    document.getElementById("copyRight").innerHTML = "";
  }

  document.getElementById("title").innerHTML = json.title;

  if ("hdurl" in json) {
    document.getElementById("picture").src = json.hdurl;
  } else {
    document.getElementById("picture").src = json.url;
  }

  document.getElementById("explanation").innerHTML = json.explanation;
};

document.getElementById("imageBtn").addEventListener("click", display);

console.log("Portfolio loaded!");

document.getElementById("emailGeneratorForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const purpose = document.getElementById("purpose").value;
  const textarea = document.getElementById("generated");

  const response = await fetch("/api/generate-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, purpose }),
  });

  const data = await response.json();
  textarea.value = data.message;
});

console.log("Portfolio loaded!");

document.getElementById("emailGeneratorForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const purpose = document.getElementById("purpose").value;
  const textarea = document.getElementById("generated");

  textarea.value = "Generating email...";

  try {
    const response = await fetch("/api/generate-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, purpose }),
    });

    if (!response.ok) {
      throw new Error("Server responded with error");
    }

    const data = await response.json();
    textarea.value = data.message || "No message received from server.";
  } catch (error) {
    console.error("Error generating email:", error);
    textarea.value = "⚠️ Sorry, something went wrong. Please try again later or contact Sarah directly.";
  }
});

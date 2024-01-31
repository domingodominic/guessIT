import axios from "axios";
import React, { useState } from "react";

function Admin() {
  const [formData, setFormdata] = useState(new FormData());
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageUrl] = useState(null);
  const [answer, setAnswer] = useState("");
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    const newformdata = new FormData();
    newformdata.append("upload_preset", "v3nwwvwc");
    newformdata.append("file", file);

    axios
      .post(
        "https://api.cloudinary.com/v1_1/dylj1p7lj/image/upload",
        newformdata
      )
      .then((res) => setImageUrl(res.data.secure_url));
  };
  console.log(imageURL);

  const handleUploadGame = async () => {
    try {
      setLoading(true);

      // Send the updated data to the backend
      console.log("image url ", imageURL, answer);
      await axios
        .post(`http://localhost:5555/fastfood/uploadNew`, {
          image: imageURL,
          answers: answer,
        })
        .then((res) => console.log(res.data));
    } catch (error) {
      setLoading(false); // Ensure loading is reset in case of an error
    }
  };

  const fastfood = () => {
    try {
      axios
        .post("http://localhost:5555/leaderboard/leader", {
          name: "Doms",
          score: 7,
          category: "fastfood",
        })
        .then((e) => console.log(e.data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Upload guess image</h1>
      <input type="file" onChange={handleFileChange} />
      <div>
        <label htmlFor="answer">Answer</label>
        <input
          type="text"
          name="answer"
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>

      <button onClick={() => handleUploadGame()}>upload</button>
    </div>
  );
}

export default Admin;

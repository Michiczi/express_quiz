import express from "express";
import cors from "cors";
import fs from "fs/promises";
const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(port, () => {
	console.log(`Serwer działa na porcie ${port}`);
});

app.get("/pytania", async (req, res) => {
	const rawData = await fs.readFile("./inf04_pytania.json", "utf8");
	const questions = JSON.parse(rawData);
	console.log(shuffleArray(questions));
	res.status(200).send(shuffleArray(questions));
});

function shuffleArray(array) {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray.slice(0, 20);
}

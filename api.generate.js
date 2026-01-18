import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  const { name, job, city, page } = req.body;

  const prompt = `
Rédige un texte web haut de gamme pour la page ${page}
d’un freelance ${job} nommé ${name} basé à ${city}.
Ton luxe, professionnel, client premium.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  res.status(200).json({
    text: completion.choices[0].message.content
  });
}

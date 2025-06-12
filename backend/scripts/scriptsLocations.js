const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Location = require("../models/Location");

// Carrega variáveis do .env
dotenv.config();

// Verifica se a URI está presente
if (!process.env.MONGO_URI) {
  console.error("Variável mongo não encontrada no .env");
  process.exit(1);
}

// Conecta ao banco usando MONGO_URI
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Conectado ao MongoDB"))
.catch((err) => {
  console.error("Erro ao conectar ao banco:", err.message);
  process.exit(1);
});

// Locais a serem inseridos
const locais = [
  { name: "UTI", description: "Unidade de Terapia Intensiva - 2º andar" },
  { name: "Sala 3", description: "Sala de procedimentos - Ala Leste" },
  { name: "Ambulatório", description: "Área de atendimento ambulatorial - térreo" },
  { name: "Ala 1", description: "Ala de internação - 1º andar" },
  { name: "Centro Cirúrgico", description: "Bloco cirúrgico com 4 salas operatórias" },
  { name: "Recepção", description: "Área de entrada e espera - térreo" }
];

// Função de seeding
async function seedLocations() {
  try {
    await Location.deleteMany({});
    console.log("Coleção 'locations' limpa");

    await Location.insertMany(locais);
    console.log("Locais inseridos com sucesso!");

    mongoose.disconnect();
  } catch (error) {
    console.error("Erro ao inserir locais:", error.message);
    mongoose.disconnect();
    process.exit(1);
  }
}

seedLocations();
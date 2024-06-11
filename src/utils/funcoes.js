import dayjs from "dayjs";

export const formatarMoeda = (valor) => {
  const partes = valor.toFixed(2).split(".");
  const numero = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `R$ ${numero},${partes[1]}`;
};

export const desformatarMoeda = (valorFormatado) => {
  const valorNumerico = parseFloat(
    valorFormatado.replace("R$ ", "").replace(",", ".")
  );
  return valorNumerico;
};

export const formatarData = (texto) => {
  const data = dayjs(texto).add(3, "hour");
  const dataFormatada = data.format("DD/MM/YYYY");
  return dataFormatada;
};

export const formatarDataComHora = (texto) => {
  const data = dayjs(texto).subtract(3, "hour");
  const dataFormatada = data.format("DD/MM/YYYY");
  return dataFormatada;
};

export const formatarDataParaEnvio = (texto) => {
  const partes = texto.split("/");
  const ano = parseInt(partes[2], 10);
  const mes = parseInt(partes[1], 10) - 1;
  const dia = parseInt(partes[0], 10);
  const dataFormatadaParaEnvio = new Date(ano, mes, dia);
  const dataFormatada = dayjs(dataFormatadaParaEnvio).format("YYYY-MM-DD");

  return dataFormatada;
};

export const formatarCPFParaEnvio = (texto) => {
  return texto.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const formatarTelefoneParaEnvio = (texto) => {
  return texto.replace(/(\d{2}) (\d{5})(\d{4})/, "($1) $2-$3");
};

export const formatarCEPParaEnvio = (texto) => {
  return texto.replace(/(\d{5})(\d{3})/, "$1-$2");
};

export const formatarCNPJParaEnvio = (texto) => {
  return texto.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2$.3/$4-$5");
};

export const removerFormatacaoData = (texto) => {
  return texto.replace(/[/]/g, "");
};

export const removerFormatacaoTelefone = (texto) => {
  return texto.replace(/[-()]/g, "");
};

export const removerFormatacaoCEP = (texto) => {
  return texto.replace(/[-]/g, "");
};

export const removerFormatacaoCNPJ = (texto) => {
  return texto.replace(/[.-/]/g, "");
};

export const removerFormatacaoCPF = (texto) => {
  return texto.replace(/[.-]/g, "");
};

export const normalizeKey = (key) => {
  return key
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/-/g, "");
};

export const removerAcentos = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const objectToArray = (obj) =>
  Object.keys(obj).map((key) => ({ ...obj[key], key }));

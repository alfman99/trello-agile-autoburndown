/**
 * Author:    Alfredo Manresa Martinez (https://github.com/alfman99/)
 * Created:   31/03/2022
 **/


let boardId = "" // Trello board id
let key = "" // Trello key
let token = "" // Trello token
let sprint = "" // Sprint number

const base = 6

let diaInicio = "";
const diaHoy = new Date();
let timePasado = "";
let diasPasados = "";

const diasSprint = 14;

const loadConfig = () => {
  const app = SpreadsheetApp;
  const ss = app.getActiveSpreadsheet();
  const s = ss.getSheetByName("config");

  boardId = s.getRange(1, 2).getValue();
  key = s.getRange(2, 2).getValue();
  token = s.getRange(3, 2).getValue();
  sprint = s.getRange(4, 2).getValue();
}

const loadSprintState = () => {

  const app = SpreadsheetApp;
  const ss = app.getActiveSpreadsheet();
  const s = ss.getSheetByName(sprint);

  diaInicio = new Date(s.getRange(6, 1).getValues());
  timePasado = diaHoy.getTime() - diaInicio.getTime();
  diasPasados = Math.trunc(timePasado/(1000*60*60*24));

}

const addImgToCard = (idCard, imgBlob) => {

  const form = {
    file: imgBlob,
    name: `auto_burndown_${new Date().toDateString()}`,
    setCover: true
  };

  const options = {
    method: 'POST',
    payload: form,
    mimeType: 'image/png',
    responseType: 'json'
  }

  const url = `https://api.trello.com/1/cards/${idCard}/attachments?key=${key}&token=${token}`
  const response = UrlFetchApp.fetch(url,options);

  return JSON.parse(response.getContentText());
}

const countCardsInList = (idList) => {
  const url = `https://api.trello.com/1/lists/${idList}/cards?key=${key}&token=${token}`
  const response = UrlFetchApp.fetch(url);
  const json = response.getContentText();
  const data = JSON.parse(json);

  return data.length;
}

const getShortlinkCardByName = (idList, name) => {
  const url = `https://api.trello.com/1/lists/${idList}/cards?key=${key}&token=${token}`
  const response = UrlFetchApp.fetch(url);
  const json = response.getContentText();
  const data = JSON.parse(json);

  for(let i = 0; i < data.length; i++) {
    if (data[i].name == name) {
      return data[i].shortLink;
    }
  }

  return null;
}

const getIdListByName = (name) => {
  const url = `https://api.trello.com/1/boards/${boardId}/lists?key=${key}&token=${token}`
  const response = UrlFetchApp.fetch(url);
  const json = response.getContentText();
  const data = JSON.parse(json);

  for(let i = 0; i < data.length; i++) {
    if (data[i].name == name) {
      return data[i].id;
    }
  }

  return null;
}

const DoAll = () => {
  
  loadConfig();
  loadSprintState();

  if (diaInicio+14 < diaHoy) {
    Logger.log("Sprint acabado, pasar al siguiente (cambiar numero de sprint y crear hoja duplicada con numero de sprint)")
    return "SPRINT_END";
  }

  const app = SpreadsheetApp;
  const ss = app.getActiveSpreadsheet();
  const s = ss.getSheetByName(sprint);
  
  if (s.getRange(base+diasPasados, 2).getValues() != 0.0) {
    return "YA_HECHO"
  }

  const idListDone = getIdListByName(`DONE ${sprint}`);

  if (!idListDone) {
    return "ERROR";
  }

  const numCards = countCardsInList(idListDone);

  s.getRange(base+diasPasados, 2).setValue(numCards);

  const chart = s.getCharts()[0]
  const slides = SlidesApp.create("temp");
  const imageBlob = slides.getSlides()[0].insertSheetsChartAsImage(chart).getAs('image/png');
  DriveApp.getFileById(slides.getId()).setTrashed(true);

  const idListDoing = getIdListByName(`DOING`);

  const idCardBurndown = getShortlinkCardByName(idListDoing, `Burndown`);
  const trelloUploadResponse = addImgToCard(idCardBurndown, imageBlob);


  Logger.log("Perfect :D")

}

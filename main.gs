// MODIFY THIS
const boardId = "" // Trello board id
const key = "" // Trello key
const token = "" // Trello token
// STOP MODIFYING

const base = 4
const diaInicio = new Date("03/22/2022");
const diaHoy = new Date();
const timePasado = diaHoy.getTime() - diaInicio.getTime();
const diasPasados = Math.trunc(timePasado/(1000*60*60*24));

const sprint = "1"

function addImgToCard (idCard, imgBlob) {

  const form = {
    file: imgBlob,
    name: `auto_burndown_${new Date().toDateString()}`
  };

  const options = {
    method: 'POST',
    payload: form,
    mimeType: 'image/png',
    responseType: 'json'
  }

  const url = `https://api.trello.com/1/cards/${idCard}/attachments?key=${key}&token=${token}`
  const response = UrlFetchApp.fetch(url,options);

  return response.getContentText();
}

function getCardIdWhereImgBurndown (idCard) {
  const url = `https://api.trello.com/1/cards/${idCard}?key=${key}&token=${token}`
  const response = UrlFetchApp.fetch(url);
  const json = response.getContentText();
  const data = JSON.parse(json);

  return data;
}

function countCardsInList(idList) {
  const url = `https://api.trello.com/1/lists/${idList}/cards?key=${key}&token=${token}`
  const response = UrlFetchApp.fetch(url);
  const json = response.getContentText();
  const data = JSON.parse(json);

  return data.length;
}

function getIdListSprint() {
  const url = `https://api.trello.com/1/boards/${boardId}/lists?key=${key}&token=${token}`
  const response = UrlFetchApp.fetch(url);
  const json = response.getContentText();
  const data = JSON.parse(json);

  for(let i = 0; i < data.length; i++) {
    if (data[i].name == `DONE ${sprint}`) {
      return data[i].id;
    }
  }

  return null;
}

function DoAll () {

  const app = SpreadsheetApp;
  const ss = app.getActiveSpreadsheet();
  const s = ss.getSheetByName("no tocar");
  

  if (s.getRange(base+diasPasados, 2).getValues() != 0.0) {
    return "YA_HECHO"
  }

  const idList = getIdListSprint();

  if (!idList) {
    return "ERROR";
  }

  const numCards = countCardsInList(idList);

  s.getRange(base+diasPasados, 2).setValue(numCards);

  const chart = s.getCharts()[0]
  const slides = SlidesApp.create("temp");
  const imageBlob = slides.getSlides()[0].insertSheetsChartAsImage(chart).getAs('image/png');
  DriveApp.getFileById(slides.getId()).setTrashed(true);

  const trelloUploadResponse = addImgToCard('FZ1KtA7z', imageBlob);

  Logger.log(trelloUploadResponse)

}

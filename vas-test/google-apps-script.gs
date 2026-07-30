const SHEET_NAME = 'Результаты';

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = getSheet_();

  sheet.appendRow([
    new Date(),
    data.date || '',
    data.time || '',
    data.fullName || '',
    data.department || '',
    data.specialty || '',
    data.theoryScore || 0,
    data.practiceScore || 0,
    data.totalScore || 0,
    data.totalQuestions || 35,
    data.percent || 0,
    data.status || '',
    data.durationSeconds || 0,
    data.wrongQuestions || '',
    data.testName || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'timestamp','date','time','fullName','department','specialty',
      'theoryScore','practiceScore','totalScore','totalQuestions',
      'percent','status','durationSeconds','wrongQuestions','testName'
    ]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

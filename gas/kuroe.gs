function checkPrice () {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheetData = book.getSheetByName("シート1");

  // 列の名前
  var idCol = 1;     // オークションID
  var priceCol = 2;  // 価格
  var timeCol = 3;   // 時刻
  
  // 現在の価格を取得
  var nowRow = 2;
  var nowPrice = sheetData.getRange(nowRow, priceCol).getValue()
  
  // 前回の価格を取得
  var lastRow = sheetData.getDataRange().getLastRow()
  var lastPrice = sheetData.getRange(lastRow, priceCol).getValue()

//  Logger.log(nowPrice)
//  Logger.log(lastPrice)
  
  // 高値更新した場合
  if (lastPrice < nowPrice) {
    
    // 高値を最終行の下に追加
    sheetData.getRange(lastRow + 1, priceCol).setValue(nowPrice);
    
    // 入札時刻を追記
    var date = new Date();
    var bidTime = Utilities.formatDate(date, 'Asia/Tokyo', 'MM/dd HH:mm');
    sheetData.getRange(lastRow + 1, timeCol).setValue(bidTime);

    // LINE messaging API に渡す
    Logger.log("lineに通知")
    
  } else {
//    Logger.log("equal or low")
  }
}

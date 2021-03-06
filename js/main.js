$(function() {
  kukuBasic();
  kukuHeading();
  kukuFlexible(5, 12);
  kukuHighlight();
});

/**
 * 基本の九九表
 */
function kukuBasic() {
  $('<hr>').appendTo('body');
  $('<h2>').text('1. Basic 9x9').appendTo('body');
  let table = $('<table>').appendTo('body');
  let row, col;
  for (row = 1; row < 10; row++) {
    let tr = $('<tr>').appendTo(table);
    for (col = 1; col < 10; col++) {
      $('<td>').text(row * col).appendTo(tr);
    }
  }
}

/**
 * 見出し付き九九表
 */
function kukuHeading() {
  $('<hr>').appendTo('body');
  $('<h2>').text('2. Heading').appendTo('body');
  let table = $('<table>').appendTo('body');
  let row, col;
  for (row = 0; row < 10; row++) {
    let tr = $('<tr>').appendTo(table);
    for (col = 0; col < 10; col++) {
      if (row === 0 && col === 0) {
        $('<th>').text('×').appendTo(tr);
      }
      else if (row === 0) {
        $('<th>').text(col).appendTo(tr);
      }
      else if (col === 0) {
        $('<th>').text(row).appendTo(tr);
      }
      else {
        $('<td>').text(row * col).appendTo(tr);
      }
    }
  }
}

/**
 * 行・列数が自由な九九表
 * @param {number} [orig_row=9] - 九九表の行数
 * @param {number} [orig_col=9] - 九九表の列数
 */
function kukuFlexible(orig_row = 9, orig_col = 9) {
  $('<hr>').appendTo('body');
  $('<h2>').text('3. Flexible').appendTo('body');
  let table = $('<table>').appendTo('body');
  let row, col;
  for (row = 0; row < orig_row + 1; row++) {
    let tr = $('<tr>').appendTo(table);
    for (col = 0; col < orig_col + 1; col++) {
      if (row === 0 && col === 0) {
        $('<th>').text('×').appendTo(tr);
      }
      else if (row === 0) {
        $('<th>').text(col).appendTo(tr);
      }
      else if (col === 0) {
        $('<th>').text(row).appendTo(tr);
      }
      else {
        $('<td>').text(row * col).appendTo(tr);
      }
    }
  }
}

/**
 * ハイライト付き九九表
 * @param {number} [orig_row=9] - 九九表の行数
 * @param {number} [orig_col=9] - 九九表の列数
 * @param {string} [hi_td=highlight-td] - ハイライトするセルに適用するCSSクラス名
 * @param {string} [hi_line=highlight-line] - ハイライトするセルと同じ行または列に適用するCSSクラス名
 */
function kukuHighlight(
  orig_row = 9,
  orig_col = 9,
  hi_td = 'highlight-td',
  hi_line = 'highlight-line'
) {
  $('<hr>').appendTo('body');
  $('<h2>').text('4. Highlighting').appendTo('body');
  let table = $('<table>').appendTo('body');
  let row, col;
  for (row = 0; row < orig_row + 1; row++) {
    let tr = $('<tr>').appendTo(table);
    for (col = 0; col < orig_col + 1; col++) {
      if (row === 0 && col === 0) {
        $('<th>').text('×').appendTo(tr);
      }
      else if (row === 0) {
        $('<th>').text(col).appendTo(tr);
      }
      else if (col === 0) {
        $('<th>').text(row).appendTo(tr);
      }
      else {
        $('<td>').text(row * col).appendTo(tr);
      }
    }
  }
  // ハイライト機能
  $(table).find('td').on('mouseover', function() {
    // <tr>を格納
    let all_tr = $(table).find('tr');

    // 縦横の座標を取得
    let idx_row = $(all_tr).index($(all_tr).has(this));
    let idx_col = $(all_tr).eq(idx_row).children('td').index(this);

    // ハイライトをリセット
    $(table).find('th, td').removeClass(hi_td + ' ' + hi_line);

    // 行をハイライト
    $(all_tr).eq(idx_row).children().addClass(hi_line);

    // 列をハイライト
    $(all_tr).each(function() {
      $(this).children().eq(idx_col + 1).addClass(hi_line);
    });

    // セルをハイライト
    $(this)
      .removeClass(hi_line)
      .addClass(hi_td);
  });

  // マウスが表から出たらハイライトを消す
  $(table).on('mouseout', function() {
    $(table).find('th, td').removeClass(hi_td + ' ' + hi_line);
  });
}